import { getDatabase, getCollection } from '../../utils/server/db';

interface Summoner {
  summonerName: string;
  region: string;
}

export const createSummonersCollection = async () => {
  await getDatabase().createCollection('summoners', {
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

export const getSummonersCollection = () => {
  return getCollection<Summoner>('summoners');
};
