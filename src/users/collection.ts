import { getCollection, initMongoDatabase } from '../utils/db';

interface User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id?: any;
  email: string;
  authToken: string;
  hashedPassword: string;
}

const USERS_COLLECTION_NAME = 'users';

export async function getUsersCollection() {
  await initMongoDatabase();
  return getCollection<User>(USERS_COLLECTION_NAME);
}
