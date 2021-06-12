import { Trophy } from '../types';

const careful: Trophy = {
  island: 'hub',
  name: 'careful',
  level: 'hubSkills',
  title: 'Careful',
  description: 'Have the least number of deaths.',
  category: 'skills',
  checkProgress: ({ match, participant }) => {
    const lessDeathsParticipants = match.info.participants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.deaths < participant.deaths
    ).length;

    return (9 - lessDeathsParticipants) / 9;
  },
};

export default careful;
