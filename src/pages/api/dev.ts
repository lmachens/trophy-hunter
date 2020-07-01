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

    const account: Account = {
      ...newAccount,
      summoner: summoner,
    };
    const checkedTrophies = Object.values(trophies).reduce(
      (current, trophy) => ({
        ...current,
        [trophy.name]: trophy.checkProgress({ match, timeline, account }),
      }),
      {}
    );

    res.json(checkedTrophies);
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
