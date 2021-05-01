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

    await Accounts.updateMany(
      {
        trophies: { $elemMatch: { status: 'completed', progress: { $lt: 1 } } },
      },
      { $set: { 'trophies.$.progress': 1 } }
    );
    console.log('DONE');
    res.send('OK');
  },
  withError,
  withDatabase
);
