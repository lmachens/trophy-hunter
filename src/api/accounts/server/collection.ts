import { getDatabase, getCollection } from '../../utils/server/db';

interface Account {
  summonerName: string;
  region: string;
}

export const createAccountsCollection = async () => {
  await getDatabase().createCollection('accounts', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        properties: {
          summonerName: {
            bsonType: 'string'
          },
          region: {
            bsonType: 'string'
          },
          authTokens: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              properties: {
                token: {
                  bsonType: 'string'
                },
                expiresAt: {
                  bsonType: 'date'
                }
              }
            }
          }
        },
        required: ['summonerName', 'region']
      }
    }
  });
};

export const getAccountsCollection = () => {
  return getCollection<Account>('accounts');
};
