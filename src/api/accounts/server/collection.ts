import { getDatabase, getCollection } from '../../utils/server/db';
import { Account } from '../types';

export const createAccountsCollection = async () => {
  await getDatabase().createCollection('accounts', {
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
        },
        required: ['islands', 'levels', 'trophies', 'authTokens'],
      },
    },
  });
};

export const getAccountsCollection = () => {
  return getCollection<Account>('accounts');
};
