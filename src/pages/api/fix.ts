import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import { welcome } from '../../components/islands/levels';
import { Level } from '../../components/levels/types';
import { AccountIsland, AccountLevel, AccountTrophy } from '../../api/accounts';
import * as levels from '../../components/islands/levels';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const Accounts = await getAccountsCollection();

    await Accounts.find({ lastMigrationAt: { $exists: false } }).forEach(
      async (account) => {
        const missingTrophies: AccountTrophy[] = [];
        const invalidLevels: AccountLevel[] = [];
        const invalidTrophies: AccountTrophy[] = [];
        const checkLevel = (level: Level) => {
          const accountLevel = account.levels.find(
            (l) => l.name === level.name
          );
          if (!accountLevel) {
            return;
          }

          let levelTrophiesCompleted = 0;
          level.trophies.forEach((trophy) => {
            const accountTrophy = account.trophies.find(
              (t) => t.name === trophy.name
            );
            if (!accountTrophy) {
              missingTrophies.push({
                name: trophy.name,
                island: trophy.island,
                level: trophy.level,
                status: 'active',
                progress: 0,
                progressDetails: null,
              });
              return;
            }
            if (accountTrophy.status === 'completed') {
              levelTrophiesCompleted++;
            }
            if (
              accountTrophy.progress >= 0.99 &&
              accountTrophy.status !== 'completed'
            ) {
              invalidTrophies.push({
                ...accountTrophy,
                status: 'completed',
              });
              levelTrophiesCompleted++;
            }
          });
          const isLevelNearlyCompleted =
            levelTrophiesCompleted / level.trophies.length >= 0.8;
          const isLevelCompleted =
            levelTrophiesCompleted / level.trophies.length >= 1;
          if (isLevelCompleted && accountLevel.status !== 'completed') {
            invalidLevels.push({
              ...accountLevel,
              status: 'completed',
            });
          } else if (
            !isLevelCompleted &&
            isLevelNearlyCompleted &&
            accountLevel.status !== 'unlocked'
          ) {
            invalidLevels.push({
              ...accountLevel,
              status: 'unlocked',
            });
          } else if (
            !isLevelCompleted &&
            !isLevelNearlyCompleted &&
            accountLevel.status !== 'active'
          ) {
            invalidLevels.push({
              ...accountLevel,
              status: 'active',
            });
          }

          level.unlocksLevels.forEach(checkLevel);
        };
        checkLevel(welcome);

        const levelPromises = invalidLevels.map(async (invalidLevel) => {
          if (invalidLevel.status !== 'active') {
            const level = levels[invalidLevel.name] as Level;

            const newLevels = level.unlocksLevels.filter(
              (level) =>
                !account.levels.some(
                  (accountLevel) => accountLevel.name === level.name
                )
            );
            const now = Date.now();
            const newAccountLevels = newLevels.map<AccountLevel>((level) => ({
              name: level.name,
              island: level.island,
              status: 'active',
              unlockedAt: now,
            }));
            await Accounts.updateOne(
              {
                _id: account._id,
              },
              {
                $push: {
                  levels: {
                    $each: newAccountLevels,
                  },
                },
              }
            );
            const newTrophies = newLevels.reduce(
              (curr, level) => [...curr, ...level.trophies],
              []
            );
            missingTrophies.push(...newTrophies);
          }

          return Accounts.updateOne(
            {
              _id: account._id,
              'levels.name': invalidLevel.name,
            },
            {
              $set: {
                'levels.$.status': invalidLevel.status,
              },
            }
          );
        });
        await Promise.all(levelPromises);
        const trophiesPromises = invalidTrophies.map((invalidTrophy) => {
          return Accounts.updateOne(
            {
              _id: account._id,
              'trophies.name': invalidTrophy.name,
            },
            {
              $set: {
                'trophies.$.status': invalidTrophy.status,
              },
            }
          );
        });
        await Promise.all(trophiesPromises);
        await Accounts.updateOne(
          {
            _id: account._id,
          },
          {
            $push: {
              trophies: {
                $each: missingTrophies,
              },
            },
          }
        );

        const newAccount = await Accounts.findOne({ _id: account._id });
        const missingIslands: AccountIsland[] = [];
        newAccount.levels.forEach((level) => {
          if (
            !newAccount.islands.find((island) => island.name === level.island)
          ) {
            missingIslands.push({
              name: level.island,
              status: 'open',
            });
          }
        });

        await Accounts.updateOne(
          {
            _id: account._id,
          },
          {
            $push: {
              islands: {
                $each: missingIslands,
              },
            },
            $set: {
              lastMigrationAt: new Date(),
            },
          }
        );

        if (
          missingTrophies.length ||
          invalidLevels.length ||
          invalidTrophies.length ||
          missingIslands.length
        ) {
          console.log(
            `${account.summoner.name} missingTrophies: ${missingTrophies.length} invalidLevels: ${invalidLevels.length} invalidTrophies: ${invalidTrophies.length} missingIslands: ${missingIslands.length}`
          );
        }
      }
    );
    console.log('DONE');
    res.send('OK');
  },
  withError,
  withDatabase
);
