import { Trophy } from '../types';

const uncounterable: Trophy = {
  island: 'combat',
  name: 'uncounterable',
  level: 'combat3',
  title: 'Uncounterable',
  description: 'Deal more than 5000 true damage to champions.',
  category: 'combat',
  maxProgress: 5000,
  checkProgress: ({ participant }) => {
    return participant.trueDamageDealtToChampions / 5000;
  },
};

export default uncounterable;
