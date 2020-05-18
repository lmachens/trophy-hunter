import { MongoClient, Db } from 'mongodb';
import getConfig from 'next/config';
import { createSummonersCollection } from '../../summoners/server/collection';

const { serverRuntimeConfig } = getConfig();

let mongoDatabase: Db = null;

export const initMongoDatabase = async () => {
  if (!mongoDatabase) {
    const client = new MongoClient(serverRuntimeConfig.MONGO_URL, {
      useUnifiedTopology: true
    });

    await client.connect();
    mongoDatabase = client.db();
    await createSummonersCollection();
  }
};

export const getCollection = <schema>(collectionName) => {
  return mongoDatabase.collection<schema>(collectionName);
};

export const getDatabase = () => {
  return mongoDatabase;
};
