import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
  withSchema,
  withDatabase,
} from '../../api/utils/server/middleware';
import {
  getSummoner,
  getMatchAndTimeline,
  getTeammateAccounts,
} from '../../api/riot/server';
import {
  allTrophies,
  aramTrophies,
} from '../../components/trophies/trophiesByMap';
import { newAccount } from '../../api/accounts/server';
import {
  getAllEvents,
  getParticipantByAccount,
  getParticipantIdentity,
} from '../../api/riot/helpers';
import { ARAM_HOWLING_ABYSS, SUPPORTED_QUEUE_IDS } from '../../api/overwolf';
import { log } from '../../api/logs';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import { getMissionsCollection } from '../../api/missions/server/collection';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { matchId, summonerName, platformId } = req.body;

    const [match, timeline] = await getMatchAndTimeline({
      platformId,
      matchId,
    });

    const summoner = await getSummoner({ summonerName, platformId });
    if (!summoner) {
      return res.status(404).end('Summoner not found');
    }

    if (!match || !timeline) {
      return res.status(404).end('Not Found');
    }

    if (!SUPPORTED_QUEUE_IDS.includes(match.queueId)) {
      return res.status(403).end(`Game mode ${match.queueId} is not supported`);
    }

    const events = getAllEvents(timeline);

    const Accounts = await getAccountsCollection();
    const account = (await Accounts.findOne({
      'summoner.name': summoner.name,
      'summoner.platformId': summoner.platformId,
    })) || {
      ...newAccount,
      summoner: summoner,
    };

    const timeLabel = `Check ${matchId} of ${account.summoner.name} ${account.summoner.platformId}`;
    console.time(timeLabel);

    const participantIdentity = getParticipantIdentity(match, account);
    if (!participantIdentity) {
      log(`Participant not found ${matchId} ${account.summoner.name}`);
      return res.status(403).end('Participant not found');
    }

    const participant = getParticipantByAccount(match, account);
    const teammateAccounts = await getTeammateAccounts(match, participant);

    const activeMission = await getMissionsCollection().findOne({
      active: true,
    });

    let accountMission = account.missions.find(
      (mission) => mission.missionId.toString() === activeMission._id.toString()
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
        missionTrophiesCompleted: 0,
      });
      const { progress } =
        typeof result === 'number' ? { progress: result } : result;
      if (progress >= 0.999) {
        missionTrophyNames.push(trophyName);
        accountMission.completedTrophyNames.push(trophyName);
      }
    });
    if (missionTrophyNames.length > 0) {
      account.missionTrophiesCompleted += missionTrophyNames.length;
    }

    const trophiesAboutToCheck =
      match.queueId === ARAM_HOWLING_ABYSS ? aramTrophies : allTrophies;
    const checkedTrophies = trophiesAboutToCheck.reduce(
      (current, trophy) => ({
        ...current,
        [trophy.name]: trophy.checkProgress({
          match,
          timeline,
          account,
          events,
          participant,
          teammateAccounts,
          missionTrophiesCompleted: missionTrophyNames.length,
        }),
      }),
      {}
    );

    res.json(checkedTrophies);
    console.timeEnd(timeLabel);
  },
  withError,
  withMethods('POST'),
  withSchema({
    type: 'object',
    properties: {
      matchId: {
        type: 'integer',
      },
      summonerName: {
        type: 'string',
      },
      platformId: {
        type: 'string',
      },
    },
    required: ['matchId', 'summonerName', 'platformId'],
  }),
  withDatabase
);
