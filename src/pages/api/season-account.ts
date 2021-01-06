import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
  withDatabase,
} from '../../api/utils/server/middleware';
import {
  getAccountsCollection,
  getSeasonAccountsCollection,
} from '../../api/accounts/server/collection';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { authToken } = req.cookies;
    const activeSeason =
      typeof req.query?.season === 'string' ? req.query?.season : null;
    if (!authToken || !activeSeason) {
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

    const SeasonAccounts = await getSeasonAccountsCollection();
    const seasonAccount = await SeasonAccounts.findOne({
      'summoner.accountId': account.summoner.accountId,
    });
    if (!seasonAccount) {
      return res.status(404).end('Not found');
    }
    seasonAccount.rank =
      (await SeasonAccounts.find({
        season: activeSeason,
        $or: [
          { trophiesCompleted: { $gt: seasonAccount.trophiesCompleted } },
          {
            trophiesCompleted: seasonAccount.trophiesCompleted,
            'summoner.revisionDate': {
              $gt: seasonAccount.summoner.revisionDate,
            },
          },
        ],
      }).count()) + 1;
    res.json(seasonAccount);
  },
  withError,
  withMethods('GET'),
  withDatabase
);
