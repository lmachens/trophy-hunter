import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const sergeant: Trophy = {
  island: 'special',
  name: 'sergeant',
  level: 'special3',
  title: 'Sergeant',
  description: 'Complete ten missions.',
  category: 'special',
  maxProgress: 10,
  aramSupport: true,
  checkProgress: ({ account, missionTrophiesCompleted }) => {
    const trophyProgress = getTrophyProgress(account, 'sergeant');
    return missionTrophiesCompleted / 10 + trophyProgress;
  },
};

export default sergeant;
