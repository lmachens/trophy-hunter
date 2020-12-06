import { NextApiRequest, NextApiResponse } from 'next';
import { getStatsObj } from '../../api/stats/server';
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
      cache.promise = getStatsObj();
      cache.timestamp = Date.now();
    }

    const statsObj = await cache.promise;

    res.setHeader('Cache-Control', 'max-age=180');
    res.json(statsObj);
  },
  withDatabase,
  withError,
  withMethods('GET')
);
