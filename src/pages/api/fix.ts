import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import { AccountTrophy } from '../../api/accounts';
import { neverGiveUp } from '../../components/trophies';
import { trophyToAccountTrophy } from '../../api/accounts/server/functions';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const Accounts = await getAccountsCollection();

    await Accounts.find({}).forEach(async (account) => {
      const newTrophies: AccountTrophy[] = [];

      let changed = false;
      const hubEpic = account.levels.find((level) => level.name === 'hubEpic');
      if (
        hubEpic &&
        !account.trophies.some((trophy) => trophy.name === neverGiveUp.name)
      ) {
        changed = true;
        newTrophies.push(trophyToAccountTrophy(neverGiveUp));
        if (hubEpic.status === 'completed') {
          hubEpic.status = 'unlocked';
        }
      }

      if (!changed) {
        return;
      }
      return Accounts.updateOne(
        { _id: account._id },
        {
          $addToSet: {
            trophies: {
              $each: newTrophies,
            },
          },
          $set: {
            levels: account.levels,
          },
        }
      );
    });
    console.log('DONE');
    res.send('OK');
  },
  withError,
  withDatabase
);
