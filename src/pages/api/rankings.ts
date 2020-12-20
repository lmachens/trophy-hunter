import { NextApiRequest, NextApiResponse } from 'next';
import { getRankings } from '../../api/accounts/server/functions';
import { THREE_MINUTES } from '../../api/utils/dates';
import {
  applyMiddleware,
  withDatabase,
  withError,
  withMethods,
} from '../../api/utils/server/middleware';

const cache = {
  timestamp: 0,
  promise: null,
};
export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (cache.timestamp < Date.now() - THREE_MINUTES) {
      cache.promise = getRankings();
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
