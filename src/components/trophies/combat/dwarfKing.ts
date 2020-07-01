import { Trophy } from '../types';
import { calcLevel, getParticipantIdentity } from '../../../api/riot/helpers';

const dwarfKing: Trophy = {
  island: 'combatIsland',
  name: 'dwarfKing',
  level: 'combat3',
  title: 'Dwarf King',
  description: 'Kill 5 opponents who have a higher level than you.',
  category: 'combat',
  checkProgress: ({ match, events, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const dwarfKingKills = events.filter((event) => {
      if (
        event.type !== 'CHAMPION_KILL' ||
        event.killerId !== participantIdentity.participantId
      ) {
        return false;
      }
      const killerLevel = calcLevel(events, event.killerId, event.timestamp);
      const victimLevel = calcLevel(events, event.victimId, event.timestamp);

      return killerLevel < victimLevel;
    }).length;
    return dwarfKingKills / 5;
  },
};

export default dwarfKing;
