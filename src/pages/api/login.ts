import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersCollection, calculateExpireAt } from '../../users/collection';
import crypto from 'crypto';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).end();
  }

  const { email } = req.body;
  const Users = await getUsersCollection();

  const authToken = jwt.sign({ email }, process.env.JWT_SECRET);

  const expiresAt = calculateExpireAt();
  const verifyToken = crypto.randomBytes(32).toString('hex');
  await Users.updateOne(
    { email },
    {
      $addToSet: {
        authTokens: {
          token: authToken,
          expiresAt,
          verifyToken
        }
      }
    },
    {
      upsert: true
    }
  );

  const securityCode = 'Random Stuff';
  res.json({ securityCode, authToken });
};
