import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const greenhorn: Trophy = {
  island: 'hubIsland',
  name: 'greenhorn',
  level: 'hubSpecial',
  title: 'Greenhorn',
  description: 'Play ten matches with the trophy hunter app.',
  category: 'special',
  maxProgress: 10,
  checkProgress: ({ account }) => {
    const trophyProgress = getTrophyProgress(account, 'greenhorn');
    return 1 / 10 + trophyProgress;
  },
};

export default greenhorn;
