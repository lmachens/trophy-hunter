import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
  withSchema,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getMatch, getTimeline, getSummoner } from '../../api/riot/server';
import * as trophies from '../../components/trophies';
import { newAccount } from '../../api/accounts/server';
import { Account } from '../../api/accounts';
import {
  getAllEvents,
  getParticipantByAccount,
  getParticipantIdentity,
} from '../../api/riot/helpers';
import { SUPPORTED_QUEUE_IDS } from '../../api/overwolf';
import { log } from '../../api/logs';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { matchId, summonerName, platformId } = req.body;

    const [match, timeline] = await Promise.all([
      getMatch({
        platformId,
        matchId,
      }),
      getTimeline({
        platformId,
        matchId,
      }),
    ]);
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

    const account: Account = {
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
    const checkedTrophies = Object.values(trophies).reduce(
      (current, trophy) => ({
        ...current,
        [trophy.name]: trophy.checkProgress({
          match,
          timeline,
          account,
          events,
          participant,
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
