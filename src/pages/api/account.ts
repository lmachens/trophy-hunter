import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
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
  account.rank =
    (await Accounts.find({
      $or: [
        { trophiesCompleted: { $gt: account.trophiesCompleted } },
        {
          trophiesCompleted: account.trophiesCompleted,
          'summoner.revisionDate': { $gt: account.summoner.revisionDate },
        },
      ],
    }).count()) + 1;
  res.json(account);
};

export default applyMiddleware(
  handleGet,
  withError,
  withMethods('GET'),
  withDatabase
);
