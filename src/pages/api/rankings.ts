import { NextApiRequest, NextApiResponse } from 'next';
import { getRankings } from '../../api/accounts/server/functions';
import { normalizeQuery } from '../../api/utils/router';
import {
  applyMiddleware,
  withDatabase,
  withError,
  withMethods,
} from '../../api/utils/server/middleware';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { season, page: pageString } = normalizeQuery(req.query);
    const page = pageString ? +pageString : 0;

    const rankings = await getRankings(season, page);

    res.setHeader('Cache-Control', 'max-age=180');
    res.json(rankings);
  },
  withDatabase,
  withError,
  withMethods('GET')
);
