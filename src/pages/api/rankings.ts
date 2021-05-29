import { NextApiRequest, NextApiResponse } from 'next';
import {
  getRankings,
  searchRankingBySummonerName,
} from '../../api/accounts/server/functions';
import { normalizeQuery } from '../../api/utils/router';
import {
  applyMiddleware,
  withDatabase,
  withError,
  withMethods,
} from '../../api/utils/server/middleware';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      season,
      page: pageString,
      summonerName,
    } = normalizeQuery(req.query);
    const page = pageString ? +pageString : 0;

    const rankings = summonerName
      ? await searchRankingBySummonerName(season, summonerName)
      : await getRankings(season, page);

    res.setHeader('Cache-Control', 'max-age=180');
    res.json(rankings);
  },
  withDatabase,
  withError,
  withMethods('GET')
);
