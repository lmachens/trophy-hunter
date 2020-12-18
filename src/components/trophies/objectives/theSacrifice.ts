import { Trophy } from '../types';
import { getParticipantDeaths } from '../../../api/riot/helpers';

const theSacrifice: Trophy = {
  island: 'objectives',
  name: 'theSacrifice',
  level: 'objectives5',
  title: 'The Sacrifice',
  description:
    'Secure your team an elite monster, eventhough you die in the five seconds after that.',
  category: 'objectives',
  checkProgress: ({ events, participant }) => {
    const deaths = getParticipantDeaths(events, participant.participantId);

    const eliteMonsterKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.killerId === participant.participantId
    );
    const sacrificeScore = eliteMonsterKills.filter((eliteMonsterKill) => {
      const participantDieIn5SecsAfter = deaths.some(
        (death) =>
          death.timestamp > eliteMonsterKill.timestamp &&
          death.timestamp < eliteMonsterKill.timestamp + 5000
      );
      return participantDieIn5SecsAfter;
    }).length;

    return sacrificeScore;
  },
};

export default theSacrifice;
