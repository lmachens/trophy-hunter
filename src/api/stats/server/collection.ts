import { log } from '../../logs';
import { getDatabase, getCollection } from '../../utils/server/db';
import { TrophyStatsObj } from '../types';

export const createTrophyStatsCollection = async () => {
  const db = await getDatabase();
  const collections = await db.listCollections().toArray();

  if (collections.some((collection) => collection.name === 'trophy-stats')) {
    log('trophy-stats Collection already exists');
    return;
  }

  await db.createCollection('trophy-stats', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        properties: {
          trophyName: {
            bsonType: 'string',
          },
          mapId: {
            bsonType: 'number',
          },
          championId: {
            bsonType: 'number',
          },
          checks: {
            bsonType: 'number',
          },
          count: {
            bsonType: 'number',
          },
        },
        required: ['trophyName', 'mapId', 'championId', 'checks', 'count'],
      },
    },
  });
};

export const getTrophyStatsCollection = () => {
  return getCollection<TrophyStatsObj>('trophy-stats');
};

export const ensureTrophyStatsIndexes = () => {
  log('Create trophy stats indexes');
  return getTrophyStatsCollection().createIndexes([{ key: { trophyName: 1 } }]);
};
