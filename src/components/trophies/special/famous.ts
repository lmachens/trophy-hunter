import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const famous: Trophy = {
  island: 'special',
  name: 'famous',
  level: 'special3',
  title: 'Famous',
  description: 'Play 40 matches with another trophy hunter.',
  category: 'special',
  maxProgress: 40,
  aramSupport: true,
  checkProgress: ({ account, teammateAccounts }) => {
    const trophyProgress = getTrophyProgress(account, 'famous');
    const playedWithTrophyHunter = teammateAccounts.length > 0;
    return +playedWithTrophyHunter / 40 + trophyProgress;
  },
};

export default famous;
