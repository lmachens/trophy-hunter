import { NextApiRequest } from 'next';
import { getAuthToken } from '../auth/cookie';

export async function handleContext(ctx: { req: NextApiRequest }) {
  const authToken = getAuthToken(ctx);
  return { authToken };
}
