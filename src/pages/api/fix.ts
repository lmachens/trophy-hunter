import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import { AccountTrophy } from '../../api/accounts';
import {
  major,
  privateFirstClass,
  privateSecondClass,
  sergeant,
  specialist,
} from '../../components/trophies';
import { trophyToAccountTrophy } from '../../api/accounts/server/functions';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const Accounts = await getAccountsCollection();

    await Accounts.find({}).forEach(async (account) => {
      const newTrophies: AccountTrophy[] = [];

      let changed = false;
      const hubSpecial = account.levels.find(
        (level) => level.name === 'hubSpecial'
      );
      if (
        hubSpecial &&
        !account.trophies.some(
          (trophy) => trophy.name === privateSecondClass.name
        )
      ) {
        changed = true;
        newTrophies.push(trophyToAccountTrophy(privateSecondClass));
        if (hubSpecial.status === 'completed') {
          hubSpecial.status = 'unlocked';
        }
      }

      const special1 = account.levels.find(
        (level) => level.name === 'special1'
      );
      if (
        special1 &&
        !account.trophies.some(
          (trophy) => trophy.name === privateFirstClass.name
        )
      ) {
        changed = true;
        newTrophies.push(trophyToAccountTrophy(privateFirstClass));
        if (special1.status === 'completed') {
          special1.status = 'unlocked';
        }
      }

      const special2 = account.levels.find(
        (level) => level.name === 'special2'
      );
      if (
        special2 &&
        !account.trophies.some((trophy) => trophy.name === specialist.name)
      ) {
        changed = true;
        newTrophies.push(trophyToAccountTrophy(specialist));
        if (special2.status === 'completed') {
          special2.status = 'unlocked';
        }
      }

      const special3 = account.levels.find(
        (level) => level.name === 'special3'
      );
      if (
        special3 &&
        !account.trophies.some((trophy) => trophy.name === sergeant.name)
      ) {
        changed = true;
        newTrophies.push(trophyToAccountTrophy(sergeant));
        if (special3.status === 'completed') {
          special3.status = 'unlocked';
        }
      }

      const special4 = account.levels.find(
        (level) => level.name === 'special4'
      );
      if (
        special4 &&
        !account.trophies.some((trophy) => trophy.name === major.name)
      ) {
        changed = true;
        newTrophies.push(trophyToAccountTrophy(major));
        if (special4.status === 'completed') {
          special4.status = 'unlocked';
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
