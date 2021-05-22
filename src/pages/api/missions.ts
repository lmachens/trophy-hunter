import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withDatabase,
  withError,
  withMethods,
} from '../../api/utils/server/middleware';
import { getMissionsCollection } from '../../api/missions/server/collection';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const activeMission = await getMissionsCollection().findOne({
      active: true,
    });

    res.setHeader('Cache-Control', 'max-age=180');
    res.json({
      activeMission,
    });
  },
  withError,
  withMethods('GET'),
  withDatabase
);
