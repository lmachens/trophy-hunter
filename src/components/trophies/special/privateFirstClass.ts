import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const privateFirstClass: Trophy = {
  island: 'special',
  name: 'privateFirstClass',
  level: 'special1',
  title: 'Private First Class',
  description: 'Complete three missions.',
  category: 'special',
  maxProgress: 3,
  aramSupport: true,
  checkProgress: ({ account, missionTrophiesCompleted }) => {
    const trophyProgress = getTrophyProgress(account, 'privateFirstClass');
    return missionTrophiesCompleted / 3 + trophyProgress;
  },
};

export default privateFirstClass;
