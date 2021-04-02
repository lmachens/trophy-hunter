import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import { AccountTrophy } from '../../api/accounts';
import {
  celebrity,
  famous,
  friendly,
  popular,
  prominent,
} from '../../components/trophies';
import { startingTrophies } from '../../api/accounts/server';
import { trophyToAccountTrophy } from '../../api/accounts/server/functions';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const Accounts = await getAccountsCollection();

    await Accounts.find({}).forEach(async (account) => {
      const newTrophies: AccountTrophy[] = [];

      startingTrophies.forEach((startingTrophy) => {
        if (
          !account.trophies.some(
            (trophy) =>
              trophy.name === startingTrophy.name &&
              startingTrophy.name !== friendly.name
          )
        ) {
          newTrophies.push(startingTrophy);
        }
      });
      const hubSpecial = account.levels.find(
        (level) => level.name === 'hubSpecial'
      );
      if (
        hubSpecial?.status &&
        !account.trophies.some((trophy) => trophy.name === friendly.name)
      ) {
        newTrophies.push(trophyToAccountTrophy(friendly));
        if (hubSpecial.status === 'completed') {
          hubSpecial.status = 'unlocked';
        }
      }
      const special1 = account.levels.find(
        (level) => level.name === 'special1'
      );
      if (
        special1 &&
        !account.trophies.some((trophy) => trophy.name === popular.name)
      ) {
        newTrophies.push(trophyToAccountTrophy(popular));
        if (special1.status === 'completed') {
          special1.status = 'unlocked';
        }
      }
      const special2 = account.levels.find(
        (level) => level.name === 'special2'
      );
      if (
        special2 &&
        !account.trophies.some((trophy) => trophy.name === prominent.name)
      ) {
        newTrophies.push(trophyToAccountTrophy(prominent));
        if (special2.status === 'completed') {
          special2.status = 'unlocked';
        }
      }
      const special3 = account.levels.find(
        (level) => level.name === 'special3'
      );
      if (
        special3 &&
        !account.trophies.some((trophy) => trophy.name === famous.name)
      ) {
        newTrophies.push(trophyToAccountTrophy(famous));
        if (special3.status === 'completed') {
          special3.status = 'unlocked';
        }
      }
      const special4 = account.levels.find(
        (level) => level.name === 'special4'
      );
      if (
        special4 &&
        !account.trophies.some((trophy) => trophy.name === celebrity.name)
      ) {
        newTrophies.push(trophyToAccountTrophy(celebrity));
        if (special4.status === 'completed') {
          special4.status = 'unlocked';
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
