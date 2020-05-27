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
import { getMatch } from '../../api/riot/server';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.status(401).end('Unauthorized');
    }

    const Accounts = await getAccountsCollection();
    let account = await Accounts.findOne({
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

    const { matchId } = req.body;

    const match = await getMatch({
      platformId: account.summoner.platformId,
      matchId,
    });
    if (!match) {
      return res.status(404).end('Not Found');
    }

    // Fake delay for testing
    const delay = () => {
      return new Promise((res) => setTimeout(res, 5000));
    };
    await delay();

    const activeLevels = account.levels
      .filter((level) => level.status === 'active')
      .map((accountLevel) => levels[accountLevel.name] as Level);

    const updateLevels = activeLevels.map(async (level) => {
      // ToDo: Check if level trophies achieved by match

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
      const updated = await Accounts.findOneAndUpdate(
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
        },
        { returnOriginal: false }
      );
      account = updated.value;

      const isIslandComplete = !account.levels
        .filter(
          (accountLevel) =>
            accountLevel.island === level.island &&
            accountLevel.name !== level.name
        )
        .find((level) => level.status !== 'completed');
      if (isIslandComplete) {
        await Accounts.updateOne(
          { _id: account._id, 'islands.name': level.island },
          {
            $set: {
              'islands.$.status': 'done',
            },
          }
        );
      }
    });
    await Promise.all(updateLevels);

    res.json({ trophyNames: ['firstBlood', 'flail'] });
  },
  withError,
  withMethods('POST'),
  withSchema({
    type: 'object',
    properties: {
      matchId: {
        type: 'integer',
      },
    },
    required: ['matchId'],
  }),
  withDatabase
);
