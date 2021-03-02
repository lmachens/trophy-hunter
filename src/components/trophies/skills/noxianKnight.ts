import { Trophy } from '../types';
import { getParticipantKillsAndAssists } from '../../../api/riot/helpers';
import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';

const noxianKnight: Trophy = {
  island: 'skills',
  name: 'noxianKnight',
  level: 'skills2',
  title: 'Noxian Knight',
  description: `Be involved in 60% of your teams kills and achieve level 18.\nARAM: 85%`,
  category: 'skills',
  aramSupport: true,
  checkProgress: ({ match, events, participant }) => {
    const teamParticipantIds = match.participants
      .filter((other) => other.teamId === participant.teamId)
      .map((teammate) => teammate.participantId);

    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    ).length;

    const teamkills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        teamParticipantIds.includes(event.killerId)
    ).length;

    const requiredRatio = match.queueId === ARAM_HOWLING_ABYSS ? 0.85 : 0.6;
    return Number(
      killsAndAssists / teamkills >= requiredRatio &&
        participant.stats.champLevel >= 18
    );
  },
};

export default noxianKnight;
