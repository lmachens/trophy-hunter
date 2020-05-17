import { Feedback } from '../types';
import { postJSON } from '../../utils/request';

export const sendToDiscord = (feedback: Feedback) => {
  return postJSON(process.env.DISCORD_WEBHOOK_URL, {
    username: 'Feedback Bot',
    content: 'New feedback!',
    embeds: [
      {
        title: 'Discord Tag',
        description: feedback.discordTag || ''
      },
      {
        title: 'Message',
        description: feedback.message
      }
    ]
  });
};
