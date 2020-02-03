import { NextApiRequest, NextApiResponse } from 'next';
import { getAuthToken } from '../../auth/cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).end();
  }

  const token = getAuthToken({ req });

  console.log('logout', token);
  res.end();
};
