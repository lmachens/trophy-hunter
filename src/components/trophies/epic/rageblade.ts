import { Trophy } from '../types';

const rageblade: Trophy = {
  island: 'epicIsland',
  name: 'rageblade',
  level: 'epic1',
  title: 'Rageblade',
  description: 'Deal more than 75000 total damage to champions.',
  category: 'epic',
  checkProgress: ({ participant }) => {
    return Number(participant.stats.totalDamageDealtToChampions >= 75000);
  },
};

export default rageblade;
