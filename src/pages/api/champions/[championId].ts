import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
} from '../../../api/utils/server/middleware';
import { getChampions } from '../../../api/riot/server';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { championId } = req.query;

    const champions = await getChampions();
    const champion = champions.find(
      (champion) => champion.key === championId.toString()
    );
    res.setHeader('Cache-Control', 'max-age=180');
    res.json(champion);
  },
  withError,
  withMethods('GET')
);
