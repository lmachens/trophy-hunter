import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const burningComet: Trophy = {
  island: 'combatIsland',
  name: 'burningComet',
  level: 'combat2',
  title: 'Burning Comet',
  description: 'Deal more than 2500 damage with Arcane Comet (rune).',
  category: 'combat',
  maxProgress: 2500,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    const trophyProgress = getTrophyProgress(account, 'burningComet');
    const damage =
      participant.stats.perk0 === 8229 ? participant.stats.perk0Var1 : 0;

    return damage / 2500 + trophyProgress * 2500;
  },
};

export default burningComet;
