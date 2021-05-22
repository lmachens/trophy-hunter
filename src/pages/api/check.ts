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
  getMatchAndTimeline,
  getTeammateAccounts,
} from '../../api/riot/server';
import { AccountIsland, AccountLevel, AccountTrophy } from '../../api/accounts';
import {
  getAllEvents,
  getParticipantIdentity,
  getParticipantByAccount,
} from '../../api/riot/helpers';
import { ARAM_HOWLING_ABYSS, SUPPORTED_QUEUE_IDS } from '../../api/overwolf';
import { log } from '../../api/logs';
import {
  getUnlockedIslandNames,
  isLevelCompleted,
  isLevelNearlyCompleted,
  trophyToAccountTrophy,
} from '../../api/accounts/server/functions';
import { addHistoryMatch } from '../../api/matches/server/functions';
import { updateTrophyStats } from '../../api/stats/server';
import {
  allTrophies,
  aramTrophies,
} from '../../components/trophies/trophiesByMap';
import { getTrophyProgress } from '../../api/accounts/helpers';
import { getMissionsCollection } from '../../api/missions/server/collection';

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

      if (match.gameDuration < 300) {
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

      const teammateAccounts = await getTeammateAccounts(match, participant);

      const accountLevels = [...account.levels];
      const accountIslands = [...account.islands];
      const accountTrophies = [...account.trophies];

      accountLevels.forEach((accountLevel) => {
        if (accountLevel.status === 'completed') {
          return;
        }

        const level = levels[accountLevel.name] as Level;
        let levelTrophiesCompleted = 0;
        // Filter level trophies ARAM/SR

        const trophiesToCheck =
          match.queueId === ARAM_HOWLING_ABYSS
            ? level.trophies.filter((trophy) => trophy.aramSupport)
            : level.trophies;

        trophiesToCheck.forEach((trophy) => {
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
            teammateAccounts,
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
          if (progress >= 0.999) {
            // Sometimes it is not exactly 1
            accountTrophy.progress = 1;
            accountTrophy.status = 'completed';
            levelTrophiesCompleted++;
            completedTrophyNames.push(accountTrophy.name);
          }
        });
        const levelINearlyCompleted = isLevelNearlyCompleted(
          level,
          levelTrophiesCompleted
        );
        const levelIsCompleted = isLevelCompleted(
          level,
          levelTrophiesCompleted
        );
        if (!levelINearlyCompleted) {
          return;
        }
        const newIslandNames = getUnlockedIslandNames(level);
        unlockedIslandNames.push(
          ...newIslandNames.filter(
            (islandName) =>
              !account.islands.some((island) => island.name === islandName)
          )
        );

        if (levelIsCompleted) {
          accountLevel.status = 'completed';
        } else if (levelINearlyCompleted) {
          accountLevel.status = 'unlocked';
        }

        const unlockIslandLevels = level.unlocksLevels.filter(
          (unlockLevel) => unlockLevel.island !== level.island
        );
        accountIslands.push(
          ...unlockIslandLevels
            .map<AccountIsland>((level) => ({
              name: level.island,
              status: 'open',
            }))
            .filter(
              (accountLevel) =>
                !account.levels.some(
                  (level) => level.name === accountLevel.name
                )
            )
        );

        const newLevels = level.unlocksLevels.filter(
          (level) =>
            !accountLevels.some(
              (accountLevel) => accountLevel.name === level.name
            )
        );
        accountLevels.push(
          ...newLevels.map<AccountLevel>((level) => ({
            name: level.name,
            island: level.island,
            status: 'active',
            unlockedAt: now,
          }))
        );

        const newTrophies = newLevels.reduce<AccountTrophy[]>(
          (curr, level) => [
            ...curr,
            ...level.trophies.map(trophyToAccountTrophy),
          ],
          []
        );
        accountTrophies.push(...newTrophies);

        const isIslandComplete = !accountLevels
          .filter(
            (accountLevel) =>
              accountLevel.island === level.island &&
              accountLevel.name !== level.name
          )
          .some((level) => level.status === 'active');
        if (!isIslandComplete) {
          return;
        }
        const island = accountIslands.find(
          (island) => island.name === level.island
        );
        island.status = 'done';
      });

      const lastGameIds = [matchId, ...account.lastGameIds.slice(0, 9)];
      const trophiesCompleted = accountTrophies.filter(
        (trophy) => trophy.status === 'completed'
      ).length;

      const activeMission = await getMissionsCollection().findOne({
        active: true,
      });

      let accountMission = account.missions.find(
        (mission) => mission.missionId === activeMission._id
      );
      if (!accountMission) {
        accountMission = {
          missionId: activeMission._id,
          completedTrophyNames: [],
        };
        account.missions.push(accountMission);
      }
      const missionTrophyNames: string[] = [];
      activeMission.trophyNames.forEach((trophyName) => {
        if (accountMission.completedTrophyNames.includes(trophyName)) {
          return;
        }
        const trophy = allTrophies.find((trophy) => trophy.name === trophyName);
        const result = trophy.checkProgress({
          match,
          timeline,
          account,
          events,
          participant,
          teammateAccounts,
        });
        const { progress } =
          typeof result === 'number' ? { progress: result } : result;
        if (progress >= 0.999) {
          missionTrophyNames.push(trophyName);
        }
      });
      await Accounts.updateOne(
        { _id: account._id },
        {
          $set: {
            missions: account.missions,
          },
          $inc: {
            missionTrophiesCompleted: missionTrophyNames.length,
          },
        }
      );

      await Accounts.updateOne(
        { _id: account._id },
        {
          $set: {
            levels: accountLevels,
            trophies: accountTrophies,
            islands: accountIslands,
            games: account.games + 1,
            lastGameIds: lastGameIds,
            trophiesCompleted,
          },
        }
      );

      res.json({
        trophyNames: completedTrophyNames,
        unlockedIslandNames: unlockedIslandNames,
        missionTrophyNames,
      });

      await addHistoryMatch({
        accountId: account._id,
        gameId: match.gameId,
        championId: participant.championId,
        win: participant.stats.win,
        queueId: match.queueId,
        gameDuration: match.gameDuration,
        gameCreatedAt: new Date(match.gameCreation),
        trophyNames: completedTrophyNames,
      });

      const trophiesAboutToCheck =
        match.queueId === ARAM_HOWLING_ABYSS ? aramTrophies : allTrophies;
      trophiesAboutToCheck.forEach((trophy) => {
        const result = trophy.checkProgress({
          match,
          timeline,
          account,
          events,
          participant,
          teammateAccounts,
        });
        const { progress } =
          typeof result === 'number' ? { progress: result } : result;

        let obtained = false;
        if (trophy.maxProgress) {
          const prevProgress = getTrophyProgress(account, trophy.name);
          if (progress > prevProgress) {
            obtained = true;
          }
        } else if (progress >= 0.999) {
          obtained = true;
        }
        updateTrophyStats({
          trophyName: trophy.name,
          mapId: match.mapId,
          championId: participant.championId,
          obtained,
        });
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
