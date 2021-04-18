import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import { AccountTrophy } from '../../api/accounts';
import { valentines, forTheVoid } from '../../components/trophies';
import { trophyToAccountTrophy } from '../../api/accounts/server/functions';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const Accounts = await getAccountsCollection();

    await Accounts.find({}).forEach(async (account) => {
      const newTrophies: AccountTrophy[] = [];

      const special1 = account.levels.find(
        (level) => level.name === 'special1'
      );
      if (
        special1 &&
        !account.trophies.some((trophy) => trophy.name === forTheVoid.name)
      ) {
        newTrophies.push(trophyToAccountTrophy(forTheVoid));
        if (special1.status === 'completed') {
          special1.status = 'unlocked';
        }
      }
      const special2 = account.levels.find(
        (level) => level.name === 'special2'
      );
      if (
        special2 &&
        !account.trophies.some((trophy) => trophy.name === valentines.name)
      ) {
        newTrophies.push(trophyToAccountTrophy(valentines));
        if (special2.status === 'completed') {
          special2.status = 'unlocked';
        }
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
