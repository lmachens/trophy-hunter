import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
  withDatabase
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { authToken } = req.cookies;
    const { summonerName, region } = jwt.verify(
      authToken,
      process.env.JWT_SECRET
    );
    if (!authToken) {
      return res.status(401).end('Unauthorized');
    }
    const Accounts = await getAccountsCollection();

    const account = await Accounts.findOne({
      summonerName,
      region,

      authTokens: {
        $elemMatch: {
          token: authToken,
          expiresAt: { $gt: new Date() }
        }
      }
    });
    if (!account) {
      return res.status(404).end('Not Found');
    }
    res.json(account);
  },
  withError,
  withMethods('GET'),
  withDatabase
);
