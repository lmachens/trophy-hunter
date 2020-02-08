import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersCollection } from '../../users/collection';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(404).end();
  }

  const { token } = req.query;
  const Users = await getUsersCollection();

  const updated = await Users.findOneAndUpdate(
    {
      'authTokens.verifyToken': token
    },
    {
      $unset: {
        'authTokens.$.verifyToken': ''
      }
    }
  );

  if (!updated.value) {
    return res.status(404).end();
  }
  res.end();
};
