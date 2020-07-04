import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const ancient: Trophy = {
  island: 'specialIsland',
  name: 'ancient',
  level: 'special4',
  title: 'Ancient',
  description: 'Play 500 matches with the trophy hunter app.',
  category: 'special',
  maxProgress: 500,
  checkProgress: ({ account }) => {
    const trophyProgress = getTrophyProgress(account, 'ancient');
    return 1 / 500 + trophyProgress * 500;
  },
};

export default ancient;
