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
import { ONE_YEAR } from '../../api/utils/dates';
import { getSummoner } from '../../api/riot/server';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { summonerName, platformId } = req.body;
    const { authToken: oldAuthToken } = req.cookies;

    const Accounts = await getAccountsCollection();

    const summoner = await getSummoner({ summonerName, platformId });
    if (!summoner) {
      return res.status(404).end('Summoner not found');
    }

    const authToken = jwt.sign(
      { accountId: summoner.accountId },
      process.env.JWT_SECRET,
      {
        expiresIn: ONE_YEAR / 1000,
      }
    );

    const expiresAt = new Date(Date.now() + ONE_YEAR);
    const account = await Accounts.findOneAndUpdate(
      {
        'summoner.accountId': summoner.accountId,
      },
      {
        $set: {
          summoner,
        },
        $addToSet: {
          authTokens: {
            token: authToken,
            expiresAt: expiresAt,
          },
        },
        $setOnInsert: {
          islands: [
            {
              name: 'hub',
              status: 'open',
            },
          ],
          levels: [
            {
              name: 'welcome',
              island: 'hub',
              status: 'active',
              unlockedAt: Date.now(),
            },
          ],
          trophies: [],
          games: 0,
          lastGameIds: [],
          favoriteTrophyNames: [],
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
      `authToken=${authToken};path=/;Max-Age=${ONE_YEAR / 1000};HttpOnly;${
        process.env.NODE_ENV === 'production' ? ';SameSite=None;Secure' : ''
      }`
    );
    res.json(account.value);

    if (oldAuthToken) {
      const { accountId } = jwt.verify(oldAuthToken, process.env.JWT_SECRET);

      // Limit to 5 authTokens
      for (let i = 5; i < account.value.authTokens.length; i++) {
        await Accounts.updateOne(
          { 'summoner.accountId': accountId },
          {
            $pop: {
              authTokens: -1,
            },
          }
        );
      }
    }
  },
  withError,
  withMethods('POST'),
  withSchema({
    type: 'object',
    properties: {
      summonerName: {
        type: 'string',
      },
      platformId: {
        type: 'string',
      },
    },
    required: ['summonerName', 'platformId'],
  }),
  withDatabase
);
