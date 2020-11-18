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
import { getMatchAndTimeline } from '../../api/riot/server';
import { AccountIsland, AccountLevel, AccountTrophy } from '../../api/accounts';
import {
  getAllEvents,
  getParticipantIdentity,
  getParticipantByAccount,
} from '../../api/riot/helpers';
import { SUPPORTED_QUEUE_IDS } from '../../api/overwolf';
import { log } from '../../api/logs';

const activeChecks: string[] = [];
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
      const account = await Accounts.findOne({
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
        `${activeChecks.length} check ${matchId} of ${account.summoner.name} ${account.summoner.platformId}`
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

      const completedTrophyNames = [];
      const unlockedIslandNames = [];

      const participantIdentity = getParticipantIdentity(match, account);
      if (!participantIdentity) {
        log(`Participant not found ${matchId} ${account.summoner.name}`);
        return res.status(403).end('Participant not found');
      }
      const participant = getParticipantByAccount(match, account);

      const accountLevels = [...account.levels];
      const accountIslands = [...account.islands];
      const accountTrophies = [...account.trophies];

      accountLevels.forEach((accountLevel) => {
        if (accountLevel.status === 'completed') {
          return accountLevel;
        }

        const level = levels[accountLevel.name] as Level;
        let levelTrophiesCompleted = 0;
        level.trophies.forEach((trophy) => {
          let accountTrophy: AccountTrophy = accountTrophies.find(
            (accountTrophy) => accountTrophy.name === trophy.name
          );
          if (!accountTrophy) {
            accountTrophy = {
              name: trophy.name,
              island: trophy.island,
              level: trophy.level,
              status: 'active',
              progress: 0,
              progressDetails: null,
            };
            accountTrophies.push(accountTrophy);
          }
          if (accountTrophy.status === 'completed') {
            levelTrophiesCompleted++;
            return;
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
            return;
          }
          accountTrophy.progress = Math.min(1, progress);
          accountTrophy.progressDetails = details;
          if (progress >= 1) {
            accountTrophy.status = 'completed';
            levelTrophiesCompleted++;
            completedTrophyNames.push(accountTrophy.name);
          }
        });
        const isLevelNearlyCompleted =
          levelTrophiesCompleted / level.trophies.length >= 0.8;
        const isLevelCompleted =
          levelTrophiesCompleted / level.trophies.length >= 1;
        if (!isLevelNearlyCompleted) {
          return;
        }
        unlockedIslandNames.push(
          ...level.unlocksLevels
            .map((level) => levels[level.name].island)
            .filter(
              (islandName) =>
                !account.islands.some((island) => island.name === islandName)
            )
        );

        if (isLevelCompleted) {
          accountLevel.status = 'completed';
        } else if (isLevelNearlyCompleted) {
          accountLevel.status = 'unlocked';
        }

        const unlockIslandLevels = level.unlocksLevels.filter(
          (unlockLevel) => unlockLevel.island !== level.island
        );
        accountIslands.push(
          ...unlockIslandLevels.map<AccountIsland>((level) => ({
            name: level.island,
            status: 'open',
          }))
        );
        accountLevels.push(
          ...level.unlocksLevels
            .filter(
              (level) =>
                !accountLevels.some(
                  (accountLevel) => accountLevel.name === level.name
                )
            )
            .map<AccountLevel>((level) => ({
              name: level.name,
              island: level.island,
              status: 'active',
              unlockedAt: now,
            }))
        );

        const isIslandComplete = !accountLevels
          .filter(
            (accountLevel) =>
              accountLevel.island === level.island &&
              accountLevel.name !== level.name
          )
          .find((level) => level.status !== 'completed');
        if (!isIslandComplete) {
          return;
        }
        const island = accountIslands.find(
          (island) => island.name === level.island
        );
        island.status = 'done';
      });

      const lastGameIds = [matchId, ...account.lastGameIds.slice(0, 9)];
      await Accounts.updateOne(
        { _id: account._id },
        {
          $set: {
            levels: accountLevels,
            trophies: accountTrophies,
            islands: accountIslands,
            games: account.games + 1,
            lastGameIds: lastGameIds,
          },
        }
      );

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
