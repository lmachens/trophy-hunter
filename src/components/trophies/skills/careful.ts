import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const careful: Trophy = {
  island: 'hubIsland',
  name: 'careful',
  level: 'hubSkills',
  title: 'Careful',
  description: 'Have the least number of deaths.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    const lessDeathsParticipants = match.participants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.stats.deaths < participant.stats.deaths
    ).length;

    return (9 - lessDeathsParticipants) / 9;
  },
};

export default careful;
