import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const burningComet: Trophy = {
  island: 'combat',
  name: 'burningComet',
  level: 'combat2',
  title: 'Burning Comet',
  description: 'Deal more than 2500 damage with Arcane Comet (rune).',
  category: 'combat',
  maxProgress: 2500,
  checkProgress: ({ account, participant }) => {
    const trophyProgress = getTrophyProgress(account, 'burningComet');
    const damage =
      participant.stats.perk0 === 8229 ? participant.stats.perk0Var1 : 0;

    return damage / 2500 + trophyProgress;
  },
};

export default burningComet;
