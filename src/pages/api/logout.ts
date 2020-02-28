import { NextApiRequest, NextApiResponse } from 'next';
import { getAuthToken } from '../../auth/authToken';
import { getUsersCollection } from '../../auth/collection';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).end();
  }

  const authToken = getAuthToken({ req });

  const Users = await getUsersCollection();
  await Users.updateOne(
    { 'authTokens.token': authToken },
    { $pull: { authTokens: { token: authToken } } }
  );

  res.end();
};
