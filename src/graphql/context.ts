import { NextApiRequest } from 'next';
import { getAuthToken } from '../auth/authToken';

export async function handleContext(ctx: { req: NextApiRequest }) {
  const authToken = getAuthToken(ctx);
  return { authToken };
}
