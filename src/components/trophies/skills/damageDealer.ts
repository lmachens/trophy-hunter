import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const damageDealer: Trophy = {
  island: 'skillsIsland',
  name: 'damageDealer',
  level: 'skills1',
  title: 'Damage Dealer',
  description: 'Deal more than 100k total damage.',
  category: 'skills',
  maxProgress: 100000,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'damageDealer');
    return participant.stats.totalDamageDealt / 100000 + trophyProgress;
  },
};

export default damageDealer;
