import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const dominatingDamage: Trophy = {
  island: 'skillsIsland',
  name: 'dominatingDamage',
  level: 'skills3',
  title: 'Dominating Damage',
  description: 'Deal more than 200k total damage.',
  category: 'skills',
  maxProgress: 200000,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'dominatingDamage');
    return participant.stats.totalDamageDealt / 200000 + trophyProgress;
  },
};

export default dominatingDamage;
