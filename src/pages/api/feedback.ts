import { NextApiRequest, NextApiResponse } from 'next';
import { sendToDiscord } from '../../api/feedback/server';
import {
  applyMiddleware,
  withError,
  withMethods,
  withSchema,
} from '../../api/utils/server/middleware';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { discordTag, message, summonerName, platformId } = req.body;
    await sendToDiscord({ discordTag, message, summonerName, platformId });
    res.json({});
  },
  withError,
  withMethods('POST'),
  withSchema({
    type: 'object',
    properties: {
      discordTag: {
        type: 'string',
      },
      summonerName: {
        type: 'string',
      },
      platformId: {
        type: 'string',
      },
      message: {
        type: 'string',
      },
    },
    required: ['message'],
  })
);
