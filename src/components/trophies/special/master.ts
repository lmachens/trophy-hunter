import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const master: Trophy = {
  island: 'specialIsland',
  name: 'master',
  level: 'special3',
  title: 'Master',
  description: 'Play 200 matches with the trophy hunter app.',
  category: 'special',
  maxProgress: 200,
  checkProgress: ({ account }) => {
    const trophyProgress = getTrophyProgress(account, 'master');
    return (1 + trophyProgress * 200) / 200;
  },
};

export default master;
