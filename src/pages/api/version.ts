import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
} from '../../api/utils/server/middleware';
import { getRecentVersion } from '../../api/riot/server';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const version = await getRecentVersion();
    res.json({
      riot: version,
    });
  },
  withError,
  withMethods('GET')
);
