import { MongoClient, Db } from 'mongodb';
import getConfig from 'next/config';
import {
  createAccountsCollection,
  createSeasonAccountsCollection,
  ensureAccountsIndexes,
  ensureSeasonAccountsIndexes,
} from '../../accounts/server/collection';
import { ensureCronsIndexes, runCrons } from '../../cron/server/collection';
import {
  createMatchesCollection,
  ensureMatchesIndexes,
} from '../../matches/server/collection';
import {
  createMissionsCollection,
  startMissionsCron,
} from '../../missions/server/collection';
import {
  createTrophyStatsCollection,
  ensureTrophyStatsIndexes,
} from '../../stats/server/collection';

const { serverRuntimeConfig } = getConfig();

let mongoDatabase: Db = null;

export const initMongoDatabase = async () => {
  if (!mongoDatabase) {
    const client = new MongoClient(serverRuntimeConfig.MONGO_URL, {
      useUnifiedTopology: true,
    });

    await client.connect();
    mongoDatabase = client.db();
    await createAccountsCollection();
    await ensureAccountsIndexes();
    await createSeasonAccountsCollection();
    await ensureSeasonAccountsIndexes();
    await createMatchesCollection();
    await ensureMatchesIndexes();
    await createTrophyStatsCollection();
    await ensureTrophyStatsIndexes();
    await createMissionsCollection();
    await ensureCronsIndexes();
    await runCrons();
    await startMissionsCron();
  }
};

export const getCollection = <schema>(collectionName) => {
  return mongoDatabase.collection<schema>(collectionName);
};

export const getDatabase = () => {
  return mongoDatabase;
};
