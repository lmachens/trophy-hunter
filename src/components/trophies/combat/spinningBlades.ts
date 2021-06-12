import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const spinningBlades: Trophy = {
  island: 'combat',
  name: 'spinningBlades',
  level: 'combat2',
  title: 'Spinning Blades',
  description: 'Deal more than 1500 damage with Press The Attack (rune).',
  category: 'combat',
  maxProgress: 1500,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'spinningBlades');

    const damage = participant.perk0 === 8005 ? participant.perk0Var1 : 0;

    return damage / 2500 + trophyProgress;
  },
};

export default spinningBlades;
