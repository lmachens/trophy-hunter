import { NextApiRequest, NextApiResponse } from 'next';
import { getTrophyStats } from '../../../api/stats/server';
import { normalizeQuery } from '../../../api/utils/router';
import {
  applyMiddleware,
  withDatabase,
  withError,
  withMethods,
} from '../../../api/utils/server/middleware';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = normalizeQuery(req.query);

    res.setHeader('Cache-Control', 'max-age=180');
    const trophyStats = await getTrophyStats(name);
    if (trophyStats.length === 0) {
      return res.status(404).end('Not found');
    }
    res.json(trophyStats[0]);
  },
  withDatabase,
  withError,
  withMethods('GET')
);
