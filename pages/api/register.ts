import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { getApolloClient } from '../../graphql/client';
import { queryUser } from '../../users/queries';
import { getUsersCollection } from '../../users/collection';
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

  await Users.insertOne({ email, authToken, hashedPassword });

  const apolloClient = getApolloClient(req);
  const loggedInUser = await queryUser(apolloClient);
  res.json({ ...loggedInUser, authToken });
};
