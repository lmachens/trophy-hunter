import { log } from '../../logs';
import { getDatabase, getCollection } from '../../utils/server/db';
import { HistoryMatch } from '../types';

export const createMatchesCollection = async () => {
  const db = await getDatabase();
  const collections = await db.listCollections().toArray();

  if (collections.some((collection) => collection.name === 'matches')) {
    log('matches Collection already exists');
    return;
  }

  await db.createCollection('matches', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        properties: {
          accountId: {
            bsonType: 'objectId',
          },
          gameId: {
            bsonType: 'number',
          },
          championId: {
            bsonType: 'number',
          },
          win: {
            bsonType: 'bool',
          },
          queueId: {
            bsonType: 'number',
          },
          gameDuration: {
            bsonType: 'number',
          },
          gameCreatedAt: {
            bsonType: 'date',
          },
          trophyNames: {
            bsonType: 'array',
            items: {
              bsonType: 'string',
            },
          },
        },
        required: [
          'accountId',
          'gameId',
          'championId',
          'win',
          'queueId',
          'gameDuration',
          'gameCreatedAt',
          'trophyNames',
        ],
      },
    },
  });
};

export const getMatchesCollection = () => {
  return getCollection<HistoryMatch>('matches');
};

export const ensureMatchesIndexes = () => {
  log('Create matches indexes');
  return getMatchesCollection().createIndexes([
    { key: { accountId: 1, gameId: -1 }, unique: true },
  ]);
};
