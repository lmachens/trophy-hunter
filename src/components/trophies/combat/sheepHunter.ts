import { Trophy } from '../types';
import { calcLevel, getParticipantIdentity } from '../../../api/riot/helpers';

const sheepHunter: Trophy = {
  island: 'combatIsland',
  name: 'sheepHunter',
  level: 'combat2',
  title: 'Sheep Hunter',
  description: 'Kill five opponents who are at least two levels below you.',
  category: 'combat',
  checkProgress: ({ match, events, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const sheepKills = events.filter((event) => {
      if (
        event.type !== 'CHAMPION_KILL' ||
        event.killerId !== participantIdentity.participantId
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
