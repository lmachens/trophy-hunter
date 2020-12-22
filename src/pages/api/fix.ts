import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const Accounts = await getAccountsCollection();

    await Accounts.find({ trophiesCompleted: { $exists: false } }).forEach(
      async (account) => {
        return Accounts.updateOne(
          { _id: account._id },
          {
            $set: {
              trophiesCompleted: account.trophies.filter(
                (trophy) => trophy.status === 'completed'
              ).length,
            },
          }
        );
      }
    );
    console.log('DONE');
    res.send('OK');
  },
  withError,
  withDatabase
);
