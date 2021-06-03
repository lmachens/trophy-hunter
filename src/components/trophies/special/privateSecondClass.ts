import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const privateSecondClass: Trophy = {
  island: 'special',
  name: 'privateSecondClass',
  level: 'hubSpecial',
  title: 'Private Second Class',
  description: 'Complete two missions.',
  category: 'special',
  maxProgress: 2,
  aramSupport: true,
  checkProgress: ({ account, missionTrophiesCompleted }) => {
    const trophyProgress = getTrophyProgress(account, 'privateSecondClass');
    return missionTrophiesCompleted / 2 + trophyProgress;
  },
};

export default privateSecondClass;
