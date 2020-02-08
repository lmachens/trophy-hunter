import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersCollection, calculateExpireAt } from '../../users/collection';
import { hashPassword } from '../../utils/crypto';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).end();
  }
  const { email, password } = req.body;

  const Users = await getUsersCollection();
  const user = await Users.findOne({ email });

  if (user) {
    res.status(400).send(`Account already exists: ${email}`);
    return;
  }

  const hashedPassword = hashPassword(password);

  const authToken = jwt.sign({ email }, process.env.JWT_SECRET);
  const expiresAt = calculateExpireAt();
  await Users.insertOne({
    email,
    authTokens: [{ token: authToken, expiresAt }],
    hashedPassword
  });

  res.json({ authToken });
};
