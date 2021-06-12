import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const overload: Trophy = {
  island: 'combat',
  name: 'overload',
  level: 'combat3',
  title: 'Overload',
  description: 'Deal more than 2500 damage with Electrocute (rune).',
  category: 'combat',
  maxProgress: 2500,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'overload');

    const damage = participant.perk0 === 8112 ? participant.perk0Var1 : 0;

    return damage / 2500 + trophyProgress;
  },
};

export default overload;
