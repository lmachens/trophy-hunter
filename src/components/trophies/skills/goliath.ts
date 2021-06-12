import { Trophy } from '../types';

const goliath: Trophy = {
  island: 'skills',
  name: 'goliath',
  level: 'skills2',
  title: 'Goliath',
  description: 'Have the single highest champion level at the end of the game.',
  category: 'skills',
  checkProgress: ({ match, participant }) => {
    const otherParticipants = match.info.participants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId
    );

    const otherMaxChampLevel = Math.max(
      ...otherParticipants.map((participant) => participant.kills)
    );

    return Number(participant.champLevel > otherMaxChampLevel);
  },
};

export default goliath;
