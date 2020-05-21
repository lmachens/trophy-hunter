import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
  withSchema,
  withDatabase,
} from '../../api/utils/server/middleware';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import * as levels from '../../components/islands/levels';
import { Level } from '../../components/levels/types';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
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
      res.setHeader('Set-Cookie', `authToken=${authToken};Max-Age=0;Secure`);
      return res.status(401).end('Unauthorized');
    }

    const { levelName } = req.body;

    const level: Level = levels[levelName];
    if (!level) {
      return res.status(404).end('Not Found');
    }
    const accountLevel = account.levels.find(
      (accountLevel) => accountLevel.name === level.name
    );
    if (!accountLevel || accountLevel.status !== 'active') {
      return res.status(406).end('Not Acceptable');
    }

    await Accounts.updateOne(
      { _id: account._id, 'levels.name': level.name },
      {
        $set: {
          'levels.$.status': 'completed',
        },
      }
    );
    const unlockIslandLevels = level.unlocksLevels.filter(
      (unlockLevel) => unlockLevel.island !== level.island
    );
    await Accounts.updateOne(
      { _id: account._id },
      {
        $push: {
          islands: {
            $each: unlockIslandLevels.map((level) => ({
              name: level.island,
              status: 'open',
            })),
          },
          levels: {
            $each: level.unlocksLevels.map((level) => ({
              name: level.name,
              island: level.island,
              status: 'active',
            })),
          },
        },
      }
    );
    res.json({});
  },
  withError,
  withMethods('POST'),
  withSchema({
    type: 'object',
    properties: {
      levelName: {
        type: 'string',
      },
    },
    required: ['levelName'],
  }),
  withDatabase
);
