import { Trophy } from '../types';
import { getParticipantKillsAndAssists } from '../../../api/riot/helpers';
import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';

const omnipresent: Trophy = {
  island: 'teamwork',
  name: 'omnipresent',
  level: 'teamwork7',
  title: 'Omnipresent',
  description: `Be involved in more than 80% of your teams kills.\nARAM: 90%`,
  category: 'teamwork',
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

    const killRatio = match.queueId === ARAM_HOWLING_ABYSS ? 0.9 : 0.8;
    return Number(killsAndAssists / teamkills >= killRatio);
  },
};

export default omnipresent;
