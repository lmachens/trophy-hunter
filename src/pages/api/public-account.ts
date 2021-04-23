import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import { normalizeQuery } from '../../api/utils/router';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { summonerName, platformId } = normalizeQuery(req.query);
    if (!summonerName || !platformId) {
      return res.status(400).end('Invalid query');
    }

    const Accounts = await getAccountsCollection();
    const account = await Accounts.findOne({
      'summoner.name': summonerName,
      'summoner.platformId': platformId,
    });
    if (!account) {
      return res.status(404).end('Not found');
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
  },
  withError,
  withMethods('GET'),
  withDatabase
);
