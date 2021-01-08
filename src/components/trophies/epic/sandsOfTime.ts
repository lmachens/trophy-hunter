import { Trophy } from '../types';

const sandsOfTime: Trophy = {
  island: 'epic',
  name: 'sandsOfTime',
  level: 'epic1',
  title: 'Sands Of Time',
  description: 'Be part of an epic game, that lasts for more than 50 minutes.',
  category: 'epic',
  checkProgress: ({ match }) => {
    return Number(match.gameDuration >= 3000);
  },
};

export default sandsOfTime;
