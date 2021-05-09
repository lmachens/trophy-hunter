import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import { AccountTrophy } from '../../api/accounts';
import { dragonHunter, warrior } from '../../components/trophies';
import { trophyToAccountTrophy } from '../../api/accounts/server/functions';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const Accounts = await getAccountsCollection();

    await Accounts.find({}).forEach(async (account) => {
      const newTrophies: AccountTrophy[] = [];

      let changed = false;
      const hubObjectives = account.levels.find(
        (level) => level.name === 'hubObjectives'
      );
      if (
        hubObjectives &&
        !account.trophies.some((trophy) => trophy.name === dragonHunter.name)
      ) {
        changed = true;
        newTrophies.push(trophyToAccountTrophy(dragonHunter));
        if (hubObjectives.status === 'completed') {
          hubObjectives.status = 'unlocked';
        }
      }
      const hubSkills = account.levels.find(
        (level) => level.name === 'hubSkills'
      );
      if (
        hubSkills &&
        !account.trophies.some((trophy) => trophy.name === warrior.name)
      ) {
        changed = true;
        newTrophies.push(trophyToAccountTrophy(warrior));
        if (hubSkills.status === 'completed') {
          hubSkills.status = 'unlocked';
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
