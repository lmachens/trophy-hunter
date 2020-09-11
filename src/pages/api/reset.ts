import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.status(401).end('Unauthorized');
    }

    const Accounts = await getAccountsCollection();
    const account = await Accounts.findOneAndUpdate(
      {
        authTokens: {
          $elemMatch: {
            token: authToken,
            expiresAt: { $gt: new Date() },
          },
        },
      },
      {
        $set: {
          islands: [
            {
              name: 'hub',
              status: 'open',
            },
          ],
          levels: [
            {
              name: 'welcome',
              island: 'hub',
              status: 'active',
              unlockedAt: Date.now(),
            },
          ],
          trophies: [],
        },
      },
      {
        upsert: true,
      }
    );

    if (!account) {
      res.setHeader('Set-Cookie', `authToken=${authToken};Max-Age=0`);
      return res.status(401).end('Unauthorized');
    }

    res.json(account);
  },
  withError,
  withMethods('POST'),
  withDatabase
);
