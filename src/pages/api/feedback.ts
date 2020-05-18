import { NextApiRequest, NextApiResponse } from 'next';
import { sendToDiscord } from '../../api/feedback/server';
import {
  applyMiddleware,
  withError,
  withMethods,
  withSchema
} from '../../api/utils/server/middleware';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { discordTag, message } = req.body;
    await sendToDiscord({ discordTag, message });
    res.setHeader('Content-Type', 'application/json');
    res.json({});
  },
  withError,
  withMethods('POST'),
  withSchema({
    type: 'object',
    properties: {
      discordTag: {
        type: 'string'
      },
      message: {
        type: 'string'
      }
    },
    required: ['message']
  })
);
