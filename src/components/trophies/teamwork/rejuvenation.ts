import { Trophy } from '../types';
import { getTrophyProgress, findPerk } from '../../../api/accounts/helpers';

const rejuvenation: Trophy = {
  island: 'teamwork',
  name: 'rejuvenation',
  level: 'teamwork4',
  title: 'Rejuvenation',
  description: 'Heal more than 4000 with Fleet Footwork (rune).',
  category: 'teamwork',
  maxProgress: 4000,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'rejuvenation');

    const tasteOfBlood = findPerk(participant, 8021).var1;
    return tasteOfBlood / 4000 + trophyProgress;
  },
};

export default rejuvenation;
