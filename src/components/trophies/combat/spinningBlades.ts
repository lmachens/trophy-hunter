import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const spinningBlades: Trophy = {
  island: 'combatIsland',
  name: 'spinningBlades',
  level: 'combat2',
  title: 'Spinning Blades',
  description: 'Deal more than 1500 damage with Press The Attack (rune).',
  category: 'combat',
  maxProgress: 1500,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    const trophyProgress = getTrophyProgress(account, 'spinningBlades');

    const damage =
      participant.stats.perk0 === 8005 ? participant.stats.perk0Var1 : 0;

    return damage / 2500 + trophyProgress * 2500;
  },
};

export default spinningBlades;
