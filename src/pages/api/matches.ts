import { FilterQuery } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import type { Account } from '../../api/accounts/types';
import { getHistoryMatches } from '../../api/matches/server/functions';
import { normalizeQuery } from '../../api/utils/router';
import {
  applyMiddleware,
  withDatabase,
  withError,
  withMethods,
} from '../../api/utils/server/middleware';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      summonerName,
      platformId,
      onlyWithTrophies: onlyWithTrophiesString,
      page: pageString,
    } = normalizeQuery(req.query);
    const onlyWithTrophies = onlyWithTrophiesString
      ? onlyWithTrophiesString === 'true'
      : false;
    const page = pageString ? +pageString : 0;

    let query: FilterQuery<Account> = {
      'summoner.name': summonerName,
      'summoner.platformId': platformId,
    };
    if (!summonerName || !platformId) {
      const { authToken } = req.cookies;
      if (!authToken) {
        return res.status(401).end('Unauthorized');
      }
      query = {
        authTokens: {
          $elemMatch: {
            token: authToken,
            expiresAt: { $gt: new Date() },
          },
        },
      };
    }

    const Accounts = await getAccountsCollection();
    const account = await Accounts.findOne(query);
    if (!account) {
      return res.status(404).end('Not found');
    }

    const result = await getHistoryMatches(account._id, onlyWithTrophies, page);

    res.setHeader('Cache-Control', 'max-age=180');
    res.json(result);
  },
  withDatabase,
  withError,
  withMethods('GET')
);
