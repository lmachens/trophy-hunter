import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authToken } = req.cookies;
  if (!authToken) {
    return res.status(401).end('Unauthorized');
  }

  const Accounts = await getAccountsCollection();
  const account = await Accounts.findOne({
    authTokens: {
      $elemMatch: {
        token: authToken,
        expiresAt: { $gt: new Date() },
      },
    },
  });
  if (!account) {
    res.setHeader(
      'Set-Cookie',
      `authToken=${authToken};path=/;Max-Age=0;HttpOnly${
        process.env.NODE_ENV === 'production' ? ';Secure' : ''
      }`
    );

    return res.status(401).end('Unauthorized');
  }
  res.json(account);
};

const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authToken } = req.cookies;
  if (!authToken) {
    return res.status(401).end('Unauthorized');
  }

  const Accounts = await getAccountsCollection();
  const account = await Accounts.findOne({
    authTokens: {
      $elemMatch: {
        token: authToken,
        expiresAt: { $gt: new Date() },
      },
    },
  });
  if (!account) {
    res.setHeader('Set-Cookie', `authToken=${authToken};Max-Age=0`);
    return res.status(401).end('Unauthorized');
  }

  const patch = req.body;
  const updated = await Accounts.updateOne(
    { _id: account._id },
    { $set: patch }
  );
  res.json(updated);
};

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      return handleGet(req, res);
    }
    if (req.method === 'PATCH') {
      return handlePatch(req, res);
    }
  },
  withError,
  withMethods('GET', 'PATCH'),
  withDatabase
);
