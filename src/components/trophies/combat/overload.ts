import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const overload: Trophy = {
  island: 'combatIsland',
  name: 'overload',
  level: 'combat3',
  title: 'Overload',
  description: 'Deal more than 2500 damage with Electrocute (rune).',
  category: 'combat',
  maxProgress: 2500,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    const trophyProgress = getTrophyProgress(account, 'overload');

    const damage =
      participant.stats.perk0 === 8112 ? participant.stats.perk0Var1 : 0;

    return damage / 2500 + trophyProgress;
  },
};

export default overload;
