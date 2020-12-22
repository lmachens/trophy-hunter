import { log } from '../../logs';
import { getDatabase, getCollection } from '../../utils/server/db';
import { Account } from '../types';

export const createAccountsCollection = async () => {
  const db = await getDatabase();
  const collections = await db.listCollections().toArray();

  if (collections.some((collection) => collection.name === 'accounts')) {
    log('accounts Collection already exists');
    return;
  }

  await db.createCollection('accounts', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        properties: {
          summoner: {
            bsonType: 'object',
            properties: {
              platformId: {
                bsonType: 'string',
              },
              accountId: {
                bsonType: 'string',
              },
              profileIconId: {
                bsonType: 'int',
              },
              name: {
                bsonType: 'string',
              },
              id: {
                bsonType: 'string',
              },
              puuid: {
                bsonType: 'string',
              },
              summonerLevel: {
                bsonType: 'int',
              },
            },
          },
          islands: {
            bsonType: 'array',
          },
          levels: {
            bsonType: 'array',
          },
          trophies: {
            bsonType: 'array',
          },
          authTokens: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              properties: {
                token: {
                  bsonType: 'string',
                },
                expiresAt: {
                  bsonType: 'date',
                },
              },
            },
          },
          games: {
            bsonType: 'int',
          },
          lastGameIds: {
            bsonType: 'array',
          },
          favoriteTrophyNames: {
            bsonType: 'array',
          },
          lastMigrationAt: {
            bsonType: 'date',
          },
          trophiesCompleted: {
            bsonType: 'int',
          },
        },
        required: [
          'islands',
          'levels',
          'trophies',
          'authTokens',
          'rank',
          'trophiesCompleted',
        ],
      },
    },
  });
};

export const getAccountsCollection = () => {
  return getCollection<Account>('accounts');
};

export const ensureIndexes = () => {
  log('Create indexes');
  return getAccountsCollection().createIndexes([
    { key: { trophiesCompleted: -1 } },
  ]);
};
