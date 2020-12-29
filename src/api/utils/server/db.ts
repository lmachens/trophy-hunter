import { MongoClient, Db } from 'mongodb';
import getConfig from 'next/config';
import {
  createAccountsCollection,
  ensureAccountsIndexes,
} from '../../accounts/server/collection';
import {
  createMatchesCollection,
  ensureMatchesIndexes,
} from '../../matches/server/collection';

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
    await createMatchesCollection();
    await ensureMatchesIndexes();
  }
};

export const getCollection = <schema>(collectionName) => {
  return mongoDatabase.collection<schema>(collectionName);
};

export const getDatabase = () => {
  return mongoDatabase;
};
