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
import {
  getMatch,
  getMatchAndTimeline,
  getTimeline,
} from '../../api/riot/server';
import { AccountTrophy } from '../../api/accounts';
import {
  getAllEvents,
  getParticipantIdentity,
  getParticipantByAccount,
} from '../../api/riot/helpers';
import { SUPPORTED_QUEUE_IDS } from '../../api/overwolf';
import { log } from '../../api/logs';

const activeChecks: string[] = [];

setInterval(() => {
  console.log(`${activeChecks.length} active checks`);
}, 60000);

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { authToken } = req.cookies;
    const { matchId } = req.body;

    try {
      if (activeChecks.includes(authToken)) {
        return res.status(401).end('Already checking a match');
      }
      activeChecks.push(authToken);

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
        log(`Account not found ${authToken}`);
        res.setHeader(
          'Set-Cookie',
          `authToken=${authToken};Max-Age=0;SameSite=None;Secure`
        );
        return res.status(401).end('Unauthorized');
      }

      if (account.lastGameIds.includes(matchId)) {
        return res.status(403).end('Already checked');
      }

      log(
        `Check ${matchId} of ${account.summoner.name} ${account.summoner.platformId}`
      );

      const [match, timeline] = await getMatchAndTimeline({
        platformId: account.summoner.platformId,
        matchId,
      });

      if (!match || !timeline) {
        return res.status(404).end('Not Found');
      }

      if (!SUPPORTED_QUEUE_IDS.includes(match.queueId)) {
        return res
          .status(403)
          .end(`Game mode ${match.queueId} is not supported`);
      }

      if (match.gameDuration < 600) {
        return res.json({
          trophyNames: [],
          unlockedIslandNames: [],
        });
      }

      const events = getAllEvents(timeline);

      const now = Date.now();

      const accountTrophies = [...account.trophies];
      const completedTrophyNames = [];
      const unlockedIslandNames = [];

      const participantIdentity = getParticipantIdentity(match, account);
      if (!participantIdentity) {
        log(`Participant not found ${matchId} ${account.summoner.name}`);
        return res.status(403).end('Participant not found');
      }
      const participant = getParticipantByAccount(match, account);

      const updateLevels = account.levels.map(async (accountLevel) => {
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

            const result = trophy.checkProgress({
              match,
              timeline,
              account,
              events,
              participant,
            });
            const { progress, details } =
              typeof result === 'number'
                ? { progress: result, details: null }
                : result;

            if (progress < 1 && !trophy.maxProgress) {
              return {
                levelTrophiesCompleted,
                accountTrophies,
              };
            }
            if (accountTrophy) {
              accountTrophy.progress = progress;
              accountTrophy.progressDetails = details;
              if (progress >= 1) {
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
              progressDetails: details,
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

        if (!isLevelCompleted || accountLevel.status === 'completed') {
          return;
        }
        const unlockedIslandNames = level.unlocksLevels
          .map((level) => levels[level.name].island)
          .filter(
            (islandName) =>
              !account.islands.some((island) => island.name === islandName)
          );

        unlockedIslandNames.push(...unlockedIslandNames);

        await Accounts.findOneAndUpdate(
          { _id: account._id, 'levels.name': level.name },
          {
            $set: {
              'levels.$.status': isLevelCompleted
                ? 'completed'
                : accountLevel.status,
            },
          }
        );

        const unlockIslandLevels = level.unlocksLevels.filter(
          (unlockLevel) => unlockLevel.island !== level.island
        );
        const updated = await Accounts.findOneAndUpdate(
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
      // Limit to 10 lastGameIds
      for (let i = 10; i < account.lastGameIds.length; i++) {
        await Accounts.updateOne(
          { _id: account._id },
          {
            $pop: {
              lastGameIds: -1,
            },
          }
        );
      }
      res.json({
        trophyNames: completedTrophyNames,
        unlockedIslandNames: unlockedIslandNames,
      });
    } finally {
      activeChecks.splice(activeChecks.indexOf(authToken), 1);
    }
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
