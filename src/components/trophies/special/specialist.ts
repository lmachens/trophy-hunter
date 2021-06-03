import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const specialist: Trophy = {
  island: 'special',
  name: 'specialist',
  level: 'special2',
  title: 'Specialist',
  description: 'Complete five missions.',
  category: 'special',
  maxProgress: 5,
  aramSupport: true,
  checkProgress: ({ account, missionTrophiesCompleted }) => {
    const trophyProgress = getTrophyProgress(account, 'specialist');
    return missionTrophiesCompleted / 5 + trophyProgress;
  },
};

export default specialist;
