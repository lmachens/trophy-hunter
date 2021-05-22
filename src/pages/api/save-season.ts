import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withDatabase,
} from '../../api/utils/server/middleware';
import {
  getAccountsCollection,
  getSeasonAccountsCollection,
} from '../../api/accounts/server/collection';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const Accounts = await getAccountsCollection();
    const SeasonAccounts = await getSeasonAccountsCollection();
    if (await SeasonAccounts.findOne({ season: '10' })) {
      return res.status(400).send('Already saved');
    }
    await Accounts.find({}).forEach(async (account) => {
      try {
        if (account.games > 0) {
          await SeasonAccounts.insertOne({
            season: '10',
            summoner: account.summoner,
            islands: account.islands,
            levels: account.levels,
            trophies: account.trophies,
            games: account.games,
            lastGameIds: account.lastGameIds,
            trophiesCompleted: account.trophiesCompleted,
          });
        }
        const now = Date.now();
        await Accounts.updateOne(
          {
            _id: account._id,
          },
          {
            $set: {
              islands: [
                {
                  name: 'hub',
                  status: 'open',
                },
              ],
              levels: [
                'welcome',
                'hubCombat',
                'hubEpic',
                'hubObjectives',
                'hubSkills',
                'hubSpecial',
                'hubTeamwork',
              ].map((name) => ({
                name,
                island: 'hub',
                status: 'active',
                unlockedAt: now,
              })),
              trophies: [
                {
                  name: 'playstyle',
                  island: 'hub',
                  level: 'welcome',
                  status: 'completed',
                  progress: 1,
                  progressDetails: null,
                },
              ],
              games: 0,
              trophiesCompleted: 1,
            },
          }
        );
      } catch (error) {
        console.error(account._id, error.message);
      }
    });
    console.log('DONE');
    res.send('OK');
  },
  withError,
  withDatabase
);
