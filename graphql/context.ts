import { NextApiRequest } from 'next';
import cookies from 'next-cookies';

export function handleContext(ctx: { req: NextApiRequest }) {
  const allCookies = cookies(ctx || {});

  const token = allCookies.jwt || '';

  // try to retrieve a user with the token
  const user = token ? { name: 'Leon', token } : null; //getUser(token);
  // add the user to the context
  return { user };
}
