import { Trophy } from '../types';
import {
  getParticipantByAccount,
  getParticipantKillsAndAssists,
} from '../../../api/riot/helpers';

const mercenary: Trophy = {
  island: 'teamworkIsland',
  name: 'mercenary',
  level: 'teamwork3',
  title: 'Mercenary',
  description:
    'You dont miss any fight. Be involved in more than 66% of your teams kills.',
  category: 'teamwork',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);
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

    return Number(killsAndAssists / teamkills >= 0.66);
  },
};

export default mercenary;
