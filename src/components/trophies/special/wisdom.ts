import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const wisdom: Trophy = {
  island: 'specialIsland',
  name: 'wisdom',
  level: 'special4',
  title: 'Wisdom',
  description: 'Play 100 matches with the trophy hunter app.',
  category: 'special',
  maxProgress: 100,
  checkProgress: ({ account }) => {
    const trophyProgress = getTrophyProgress(account, 'wisdom');
    return (1 + trophyProgress * 100) / 100;
  },
};

export default wisdom;
