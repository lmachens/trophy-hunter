import { ensureCron, onCron } from '../../cron/server/collection';
import { log } from '../../logs';
import { getDatabase, getCollection } from '../../utils/server/db';
import { Mission } from '../types';
import { startNewMission } from './functions';

export const createMissionsCollection = async () => {
  const db = getDatabase();
  const collections = await db.listCollections().toArray();

  if (collections.some((collection) => collection.name === 'missions')) {
    log('missions Collection already exists');
    return;
  }

  await db.createCollection('missions', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        properties: {
          active: {
            bsonType: 'bool',
          },
          trophyNames: {
            bsonType: 'array',
            items: {
              bsonType: 'string',
            },
          },
          startDate: {
            bsonType: 'date',
          },
        },
        required: ['active', 'trophyNames', 'startDate'],
      },
    },
  });
};

export const getMissionsCollection = () => {
  return getCollection<Mission>('missions');
};

export const startMissionsCron = async () => {
  onCron('missions', startNewMission);

  await ensureCron({
    type: 'missions',
    sleepUntil: new Date(),
    interval: '0 0 * * SUN',
  });
};
