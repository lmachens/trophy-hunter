import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const popular: Trophy = {
  island: 'special',
  name: 'popular',
  level: 'special1',
  title: 'Popular',
  description: 'Play 10 matches with another trophy hunter.',
  category: 'special',
  maxProgress: 10,
  aramSupport: true,
  checkProgress: ({ account, teammateAccounts }) => {
    const trophyProgress = getTrophyProgress(account, 'popular');
    const playedWithTrophyHunter = teammateAccounts.length > 0;
    return +playedWithTrophyHunter / 10 + trophyProgress;
  },
};

export default popular;
