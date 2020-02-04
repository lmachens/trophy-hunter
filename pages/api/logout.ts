import { NextApiRequest, NextApiResponse } from 'next';
import { getAuthToken } from '../../auth/cookie';
import { getUsersCollection } from '../../users/collection';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).end();
  }

  const authToken = getAuthToken({ req });

  const Users = await getUsersCollection();
  await Users.updateOne({ authToken }, { $unset: { authToken: '' } });

  res.end();
};
