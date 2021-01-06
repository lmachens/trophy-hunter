import { NextApiRequest, NextApiResponse } from 'next';
import { getRankings } from '../../api/accounts/server/functions';
import { currentSeason } from '../../api/riot/server';
import { THREE_MINUTES } from '../../api/utils/dates';
import {
  applyMiddleware,
  withDatabase,
  withError,
  withMethods,
} from '../../api/utils/server/middleware';

const caches: {
  [key: string]: {
    timestamp: number;
    promise: Promise<unknown>;
  };
} = {};

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const activeSeason =
      typeof req.query?.season === 'string' ? req.query?.season : currentSeason;
    if (!caches[activeSeason]) {
      caches[activeSeason] = {
        timestamp: 0,
        promise: null,
      };
    }
    const cache = caches[activeSeason];
    if (cache.timestamp < Date.now() - THREE_MINUTES) {
      cache.promise = getRankings(activeSeason);
      cache.timestamp = Date.now();
    }

    const rankings = await cache.promise;

    res.setHeader('Cache-Control', 'max-age=180');
    res.json(rankings);
  },
  withDatabase,
  withError,
  withMethods('GET')
);
