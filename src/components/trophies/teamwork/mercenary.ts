import { Trophy } from '../types';
import { getParticipantKillsAndAssists } from '../../../api/riot/helpers';
import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';

const mercenary: Trophy = {
  island: 'teamwork',
  name: 'mercenary',
  level: 'teamwork3',
  title: 'Mercenary',
  description: `You dont miss any fight. Be involved in more than 66% of your teams kills.\nARAM: 75%`,
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

    const ratio = match.queueId === ARAM_HOWLING_ABYSS ? 0.75 : 0.66;
    return Number(killsAndAssists / teamkills >= ratio);
  },
};

export default mercenary;
