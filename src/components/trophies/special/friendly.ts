import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const friendly: Trophy = {
  island: 'hub',
  name: 'friendly',
  level: 'hubSpecial',
  title: 'Friendly',
  description: 'Play 2 matches with another trophy hunter.',
  category: 'special',
  maxProgress: 2,
  checkProgress: ({ account, teammateAccounts }) => {
    const trophyProgress = getTrophyProgress(account, 'friendly');
    const playedWithTrophyHunter = teammateAccounts.length > 0;
    return +playedWithTrophyHunter / 2 + trophyProgress;
  },
};

export default friendly;
