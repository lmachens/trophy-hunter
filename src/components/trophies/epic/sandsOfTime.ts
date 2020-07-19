import { Trophy } from '../types';

const sandsOfTime: Trophy = {
  island: 'epicIsland',
  name: 'sandsOfTime',
  level: 'epic1',
  title: 'Sands Of Time',
  description: 'Be part of an epic game, that lasts for more than an hour.',
  category: 'epic',
  checkProgress: ({ match }) => {
    return Number(match.gameDuration >= 3600);
  },
};

export default sandsOfTime;
