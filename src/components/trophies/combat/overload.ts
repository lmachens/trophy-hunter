import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

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
    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'overload'
    );
    const progress =
      (existingTrophy ? existingTrophy.progress : 0) +
      (participant.stats.perk0 === 8112 ? participant.stats.perk0Var1 : 0);

    return progress / 2500;
  },
};

export default overload;
