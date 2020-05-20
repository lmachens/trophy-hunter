import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import { newAccount } from '../../api/accounts/server';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.json(newAccount);
    }
    const { summonerName, region } = jwt.verify(
      authToken,
      process.env.JWT_SECRET
    );

    const Accounts = await getAccountsCollection();
    const account = await Accounts.findOne({
      summonerName,
      region,

      authTokens: {
        $elemMatch: {
          token: authToken,
          expiresAt: { $gt: new Date() },
        },
      },
    });
    if (!account) {
      res.setHeader('Set-Cookie', `authToken=${authToken};Max-Age=0;Secure`);
      return res.status(401).end('Unauthorized');
    }
    res.json(account);
  },
  withError,
  withMethods('GET'),
  withDatabase
);
