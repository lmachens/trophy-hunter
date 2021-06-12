import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const soulHarvest: Trophy = {
  island: 'combat',
  name: 'soulHarvest',
  level: 'combat3',
  title: 'Soul Harvest',
  description: 'Deal more than 2000 damage with Dark Harvest (rune).',
  category: 'combat',
  maxProgress: 2000,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'soulHarvest');

    const damage = participant.perk0 === 8128 ? participant.perk0Var1 : 0;

    return damage / 2000 + trophyProgress;
  },
};

export default soulHarvest;
