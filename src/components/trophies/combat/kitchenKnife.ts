import { Trophy } from '../types';

const kitchenKnife: Trophy = {
  island: 'hubIsland',
  name: 'kitchenKnife',
  level: 'hubCombat',
  title: 'Kitchen Knife',
  description: 'Deal more than 30000 total damage to champions.',
  category: 'combat',
  checkProgress: ({ participant }) => {
    return participant.stats.totalDamageDealtToChampions / 30000;
  },
};

export default kitchenKnife;
