import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
  withSchema,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import { ONE_YEAR_IN_MILLISECONDS } from '../../api/utils/dates';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { summonerName, region } = req.body;
    const { authToken: oldAuthToken } = req.cookies;

    const Accounts = await getAccountsCollection();

    if (oldAuthToken) {
      const { summonerName, region } = jwt.verify(
        oldAuthToken,
        process.env.JWT_SECRET
      );

      await Accounts.updateOne(
        { summonerName, region },
        {
          $pull: {
            authTokens: {
              token: oldAuthToken,
            },
          },
        }
      );
    }

    const authToken = jwt.sign(
      { summonerName, region },
      process.env.JWT_SECRET,
      { expiresIn: ONE_YEAR_IN_MILLISECONDS / 1000 }
    );

    const expiresAt = new Date(Date.now() + ONE_YEAR_IN_MILLISECONDS);
    const account = await Accounts.findOneAndUpdate(
      {
        summonerName,
        region,
      },
      {
        $addToSet: {
          authTokens: {
            token: authToken,
            expiresAt: expiresAt,
          },
        },
        $setOnInsert: {
          trophiesCount: 0,
          islands: {
            hubIsland: {
              status: 'open',
              trophiesCount: 0,
              levels: {
                welcome: {
                  status: 'active',
                  trophies: {},
                },
              },
            },
          },
        },
      },
      {
        upsert: true,
        returnOriginal: false,
      }
    );

    if (!account.ok) {
      throw account.lastErrorObject;
    }

    res.setHeader(
      'Set-Cookie',
      `authToken=${authToken};path=/;Max-Age=${
        ONE_YEAR_IN_MILLISECONDS / 1000
      };SameSite=None;HttpOnly${
        process.env.NODE_ENV === 'production' ? ';Secure' : ''
      }`
    );
    res.json(account.value);
  },
  withError,
  withMethods('POST'),
  withSchema({
    type: 'object',
    properties: {
      summonerName: {
        type: 'string',
      },
      region: {
        type: 'string',
      },
    },
    required: ['summonerName', 'region'],
  }),
  withDatabase
);
