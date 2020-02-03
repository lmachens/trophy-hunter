import { NextApiRequest } from 'next';
import { getAuthToken } from '../auth/cookie';

export function handleContext(ctx: { req: NextApiRequest }) {
  const token = getAuthToken(ctx);

  // try to retrieve a user with the token
  const user = token ? { name: 'Leon', token } : null; //getUser(token);
  // add the user to the context
  return { user };
}
