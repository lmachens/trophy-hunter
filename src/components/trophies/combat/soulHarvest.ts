import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const soulHarvest: Trophy = {
  island: 'combatIsland',
  name: 'soulHarvest',
  level: 'combat3',
  title: 'Soul Harvest',
  description: 'Deal more than 2000 damage with Dark Harvest (rune).',
  category: 'combat',
  maxProgress: 2000,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    const trophyProgress = getTrophyProgress(account, 'soulHarvest');

    const damage =
      participant.stats.perk0 === 8128 ? participant.stats.perk0Var1 : 0;

    return (damage + trophyProgress * 2000) / 2000;
  },
};

export default soulHarvest;
