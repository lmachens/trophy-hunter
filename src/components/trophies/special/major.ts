import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const major: Trophy = {
  island: 'special',
  name: 'major',
  level: 'special4',
  title: 'Major',
  description: 'Complete 20 missions.',
  category: 'special',
  maxProgress: 20,
  aramSupport: true,
  checkProgress: ({ account, missionTrophiesCompleted }) => {
    const trophyProgress = getTrophyProgress(account, 'major');
    return missionTrophiesCompleted / 20 + trophyProgress;
  },
};

export default major;
