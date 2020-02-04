import { MongoClient, Db } from 'mongodb';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

let mongoDatabase: Db = null;

export async function initMongoDatabase() {
  if (!mongoDatabase) {
    const client = new MongoClient(serverRuntimeConfig.MONGO_URL);

    await client.connect();
    mongoDatabase = client.db();
  }
}

export function getCollection<schema>(collectionName) {
  if (mongoDatabase === null) {
    throw new Error('Database is not initialized. Call initDb first.');
  }
  return mongoDatabase.collection<schema>(collectionName);
}
