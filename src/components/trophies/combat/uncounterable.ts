import { Trophy } from '../types';

const uncounterable: Trophy = {
  island: 'combatIsland',
  name: 'uncounterable',
  level: 'combat3',
  title: 'Uncounterable',
  description: 'Deal more than 5000 true damage to champions.',
  category: 'combat',
  maxProgress: 5000,
  checkProgress: ({ participant }) => {
    return participant.stats.trueDamageDealtToChampions / 5000;
  },
};

export default uncounterable;
