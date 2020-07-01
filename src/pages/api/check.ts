import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
  withSchema,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import * as levels from '../../components/islands/levels';
import { Level } from '../../components/levels/types';
import { getMatch, getTimeline } from '../../api/riot/server';
import { AccountTrophy } from '../../api/accounts';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.status(401).end('Unauthorized');
    }

    const Accounts = await getAccountsCollection();
    let account = await Accounts.findOne({
      authTokens: {
        $elemMatch: {
          token: authToken,
          expiresAt: { $gt: new Date() },
        },
      },
    });
    if (!account) {
      res.setHeader('Set-Cookie', `authToken=${authToken};Max-Age=0;Secure`);
      return res.status(401).end('Unauthorized');
    }
    const { matchId } = req.body;

    const [match, timeline] = await Promise.all([
      getMatch({
        platformId: account.summoner.platformId,
        matchId,
      }),
      getTimeline({
        platformId: account.summoner.platformId,
        matchId,
      }),
    ]);
    if (!match || !timeline) {
      return res.status(404).end('Not Found');
    }

    const now = Date.now();
    const activeLevels = account.levels.filter(
      (level) => level.status === 'active'
    );

    const accountTrophies = [...account.trophies];
    const completedTrophyNames = [];
    const updateLevels = activeLevels.map(async (accountLevel) => {
      const level = levels[accountLevel.name] as Level;
      const { levelTrophiesCompleted } = level.trophies.reduce(
        ({ levelTrophiesCompleted }, trophy) => {
          const accountTrophy = accountTrophies.find(
            (accountTrophy) => accountTrophy.name === trophy.name
          );
          if (accountTrophy?.status === 'completed') {
            return {
              levelTrophiesCompleted: levelTrophiesCompleted + 1,
              accountTrophies,
            };
          }
          const progress = trophy.checkProgress({ match, timeline, account });
          if (progress < 1 && trophy.maxProgress) {
            return {
              levelTrophiesCompleted,
              accountTrophies,
            };
          }
          if (accountTrophy) {
            accountTrophy.progress = Math.min(
              1,
              accountTrophy.progress + progress
            );
            if (accountTrophy.progress >= 1) {
              accountTrophy.status = 'completed';
              completedTrophyNames.push(accountTrophy.name);
              return {
                levelTrophiesCompleted: levelTrophiesCompleted + 1,
                accountTrophies,
              };
            }
            return {
              levelTrophiesCompleted,
              accountTrophies,
            };
          }
          const newTrophy: AccountTrophy = {
            name: trophy.name,
            island: trophy.island,
            level: trophy.level,
            status: progress >= 1 ? 'completed' : 'active',
            progress: Math.min(1, progress),
          };
          accountTrophies.push(newTrophy);
          if (progress >= 1) {
            completedTrophyNames.push(newTrophy.name);
            return {
              levelTrophiesCompleted: levelTrophiesCompleted + 1,
            };
          }
          return {
            levelTrophiesCompleted: levelTrophiesCompleted,
          };
        },
        {
          levelTrophiesCompleted: 0,
        }
      );

      const isLevelCompleted =
        levelTrophiesCompleted / level.trophies.length > 0.8;

      let updated = await Accounts.findOneAndUpdate(
        { _id: account._id, 'levels.name': level.name },
        {
          $set: {
            'levels.$.status': isLevelCompleted
              ? 'completed'
              : accountLevel.status,
          },
        },
        { returnOriginal: false }
      );

      account = updated.value;
      if (!isLevelCompleted) {
        return;
      }

      const unlockIslandLevels = level.unlocksLevels.filter(
        (unlockLevel) => unlockLevel.island !== level.island
      );
      updated = await Accounts.findOneAndUpdate(
        { _id: account._id },
        {
          $push: {
            islands: {
              $each: unlockIslandLevels.map((level) => ({
                name: level.island,
                status: 'open',
              })),
            },
            levels: {
              $each: level.unlocksLevels.map((level) => ({
                name: level.name,
                island: level.island,
                status: 'active',
                unlockedAt: now,
              })),
            },
          },
        },
        { returnOriginal: false }
      );
      account = updated.value;

      const isIslandComplete = !account.levels
        .filter(
          (accountLevel) =>
            accountLevel.island === level.island &&
            accountLevel.name !== level.name
        )
        .find((level) => level.status !== 'completed');
      if (!isIslandComplete) {
        return;
      }
      await Accounts.updateOne(
        { _id: account._id, 'islands.name': level.island },
        {
          $set: {
            'islands.$.status': 'done',
          },
        }
      );
    });
    await Promise.all(updateLevels);
    await Accounts.updateOne(
      { _id: account._id },
      {
        $set: {
          trophies: accountTrophies,
          games: account.games + 1,
        },
        $push: {
          lastGameIds: matchId,
        },
      }
    );

    res.json({ trophyNames: completedTrophyNames });
  },
  withError,
  withMethods('POST'),
  withSchema({
    type: 'object',
    properties: {
      matchId: {
        type: 'integer',
      },
    },
    required: ['matchId'],
  }),
  withDatabase
);
