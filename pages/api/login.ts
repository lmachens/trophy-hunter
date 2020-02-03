import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { getApolloClient } from '../../graphql/client';
import { queryUser } from '../../users/queries';

const SECRET_KEY = 'secret!';
const theUser = { id: 1, email: 'leon.machens@gmail.com', password: '123' };
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).end();
  }

  const { email, password } = req.body;
  if (!theUser.email === email) {
    res.status(404).send({
      success: false,
      message: `Could not find account: ${email}`
    });
    return;
  }

  const match = password === theUser.password;
  if (!match) {
    // return error to user to let them know the password is incorrect
    res.status(401).send({
      success: false,
      message: 'Incorrect credentials'
    });
    return;
  }

  const token = jwt.sign({ email: theUser.email, id: theUser.id }, SECRET_KEY);

  const apolloClient = getApolloClient(req);
  // ToDo: Update my token
  const user = await queryUser(apolloClient);
  res.send({ ...user, token });
};
