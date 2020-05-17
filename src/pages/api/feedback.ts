import { NextApiRequest, NextApiResponse } from 'next';
import { sendToDiscord } from '../../api/feedback/server';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 405, message: 'Method not allowed' });
  }

  try {
    const { discordTag, message } = req.body;
    if (!message || message.trim().length === 0) {
      return res
        .status(400)
        .json({ status: 400, message: 'Message is missing' });
    }

    await sendToDiscord({ discordTag, message });
    res.json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal server error' });
  }
};
