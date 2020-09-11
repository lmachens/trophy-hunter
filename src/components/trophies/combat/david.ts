import { Trophy } from '../types';
import { calcLevel } from '../../../api/riot/helpers';

const david: Trophy = {
  island: 'combatIsland',
  name: 'david',
  level: 'combat2',
  title: 'David',
  description: 'Kill an opponent who is at least two levels above you.',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    const davidKills = events.filter((event) => {
      if (
        event.type !== 'CHAMPION_KILL' ||
        event.killerId !== participant.participantId
      ) {
        return false;
      }
      const killerLevel = calcLevel(events, event.killerId, event.timestamp);
      const victimLevel = calcLevel(events, event.victimId, event.timestamp);

      return victimLevel >= killerLevel + 2;
    }).length;
    return davidKills;
  },
};

export default david;
