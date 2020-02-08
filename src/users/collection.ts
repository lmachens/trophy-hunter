import { getCollection, initMongoDatabase } from '../utils/db';
import { ONE_YEAR } from '../utils/dates';

interface AuthToken {
  token: string;
  expiresAt: number;
}

interface User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id?: any;
  email: string;
  authTokens: AuthToken[];
  hashedPassword: string;
}

const USERS_COLLECTION_NAME = 'users';

export async function getUsersCollection() {
  await initMongoDatabase();
  return getCollection<User>(USERS_COLLECTION_NAME);
}

export function calculateExpireAt() {
  return Date.now() + ONE_YEAR;
}
