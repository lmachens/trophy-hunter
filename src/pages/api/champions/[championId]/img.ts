import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
} from '../../../../api/utils/server/middleware';
import { getChampions } from '../../../../api/riot/server';
import { getRecentVersion } from '../../../../api/riot/server';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { championId } = req.query;

    const champions = await getChampions();
    const champion = champions.find(
      (champion) => champion.key === championId.toString()
    );
    if (!champion) {
      return res.status(404).end('Not found');
    }
    res.setHeader('Cache-Control', 'max-age=180');
    const version = await getRecentVersion();
    res.redirect(
      `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`
    );
  },
  withError,
  withMethods('GET')
);
