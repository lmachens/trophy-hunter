import { NextApiRequest, NextApiResponse } from 'next';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import { getHistoryMatches } from '../../api/matches/server/functions';
import {
  applyMiddleware,
  withDatabase,
  withError,
  withMethods,
} from '../../api/utils/server/middleware';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.status(401).end('Unauthorized');
    }

    const Accounts = await getAccountsCollection();
    const account = await Accounts.findOne({
      authTokens: {
        $elemMatch: {
          token: authToken,
          expiresAt: { $gt: new Date() },
        },
      },
    });
    if (!account) {
      res.setHeader(
        'Set-Cookie',
        `authToken=${authToken};path=/;Max-Age=0;HttpOnly;SameSite=None;Secure`
      );

      return res.status(401).end('Unauthorized');
    }

    const matches = await getHistoryMatches(account._id);

    res.setHeader('Cache-Control', 'max-age=180');
    res.json(matches);
  },
  withDatabase,
  withError,
  withMethods('GET')
);
