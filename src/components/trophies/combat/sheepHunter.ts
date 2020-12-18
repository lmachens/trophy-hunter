import { Trophy } from '../types';
import { calcLevel } from '../../../api/riot/helpers';

const sheepHunter: Trophy = {
  island: 'combat',
  name: 'sheepHunter',
  level: 'combat2',
  title: 'Sheep Hunter',
  description: 'Kill five opponents who are at least two levels below you.',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    const sheepKills = events.filter((event) => {
      if (
        event.type !== 'CHAMPION_KILL' ||
        event.killerId !== participant.participantId
      ) {
        return false;
      }
      const killerLevel = calcLevel(events, event.killerId, event.timestamp);
      const victimLevel = calcLevel(events, event.victimId, event.timestamp);
      const levelDiff = killerLevel - victimLevel;

      return levelDiff >= 2;
    }).length;

    return sheepKills / 5;
  },
};

export default sheepHunter;
