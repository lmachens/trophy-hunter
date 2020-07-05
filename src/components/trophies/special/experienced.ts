import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const experienced: Trophy = {
  island: 'specialIsland',
  name: 'experienced',
  level: 'special2',
  title: 'Experienced',
  description: 'Play 50 matches with the trophy hunter app.',
  category: 'special',
  maxProgress: 50,
  checkProgress: ({ account }) => {
    const trophyProgress = getTrophyProgress(account, 'experienced');
    return 1 / 50 + trophyProgress;
  },
};

export default experienced;
