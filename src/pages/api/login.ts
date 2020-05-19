import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
  withSchema,
  withDatabase
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';

const ONE_YEAR = 12 * 30 * 24 * 60 * 60 * 1000;
export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { summonerName, region } = req.body;

    const Accounts = await getAccountsCollection();

    const authToken = jwt.sign(
      { summonerName, region },
      process.env.JWT_SECRET,
      { expiresIn: ONE_YEAR / 1000 }
    );

    const expiresAt = new Date(Date.now() + ONE_YEAR);
    await Accounts.updateOne(
      { summonerName, region },
      {
        $addToSet: {
          authTokens: {
            token: authToken,
            expiresAt: expiresAt
          }
        }
      },
      {
        upsert: true
      }
    );

    res.json({ authToken });
  },
  withError,
  withMethods('POST'),
  withSchema({
    type: 'object',
    properties: {
      summonerName: {
        type: 'string'
      },
      region: {
        type: 'string'
      }
    },
    required: ['summonerName', 'region']
  }),
  withDatabase
);
