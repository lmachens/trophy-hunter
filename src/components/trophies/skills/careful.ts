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
    const lessDeaths = match.participants.find(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.stats.deaths < participant.stats.deaths
    );

    return Number(!lessDeaths);
  },
};

export default careful;
