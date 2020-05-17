import { NextApiRequest, NextApiResponse } from 'next';
import { sendToDiscord } from '../../api/feedback/server';
import {
  applyMiddleware,
  withError,
  withMethods,
  withValidate,
  check
} from '../../api/utils/server/middleware';
import isLength from 'validator/lib/isLength';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { discordTag, message } = req.body;
    await sendToDiscord({ discordTag, message });
    res.setHeader('Content-Type', 'application/json');
    res.json({});
  },
  withError,
  withMethods('POST'),
  withValidate(check('message', isLength, { min: 1 }))
);
