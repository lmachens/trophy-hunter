import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { getApolloClient } from '../../graphql/client';
import { queryUser } from '../../users/queries';
import { getUsersCollection } from '../../users/collection';
import { verifyHash } from '../../utils/crypto';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).end();
  }

  const { email, password } = req.body;
  const Users = await getUsersCollection();
  const user = await Users.findOne({ email });

  if (!user) {
    res.status(404).send(`Could not find account: ${email}`);
    return;
  }

  if (!verifyHash(password, user.hashedPassword)) {
    res.status(401).send('Incorrect credentials');
    return;
  }

  const authToken = jwt.sign(
    { email: user.email, password },
    process.env.JWT_SECRET
  );

  await Users.updateOne({ _id: user._id }, { $set: { authToken } });

  const apolloClient = getApolloClient(req);
  const loggedInUser = await queryUser(apolloClient);
  res.json({ ...loggedInUser, authToken });
};
