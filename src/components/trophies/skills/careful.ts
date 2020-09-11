import { Trophy } from '../types';

const careful: Trophy = {
  island: 'hubIsland',
  name: 'careful',
  level: 'hubSkills',
  title: 'Careful',
  description: 'Have the least number of deaths.',
  category: 'skills',
  checkProgress: ({ match, participant }) => {
    const lessDeathsParticipants = match.participants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.stats.deaths < participant.stats.deaths
    ).length;

    return (9 - lessDeathsParticipants) / 9;
  },
};

export default careful;
