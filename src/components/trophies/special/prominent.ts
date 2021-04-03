import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const prominent: Trophy = {
  island: 'special',
  name: 'prominent',
  level: 'special2',
  title: 'Prominent',
  description: 'Play 20 matches with another trophy hunter.',
  category: 'special',
  maxProgress: 20,
  aramSupport: true,
  checkProgress: ({ account, teammateAccounts }) => {
    const trophyProgress = getTrophyProgress(account, 'prominent');
    const playedWithTrophyHunter = teammateAccounts.length > 0;
    return +playedWithTrophyHunter / 20 + trophyProgress;
  },
};

export default prominent;
