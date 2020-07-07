import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const goliath: Trophy = {
  island: 'skillsIsland',
  name: 'goliath',
  level: 'skills2',
  title: 'Goliath',
  description: 'Have the single highest champion level at the end of the game.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const otherParticipants = match.participants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId
    );

    const otherMaxChampLevel = Math.max(
      ...otherParticipants.map((participant) => participant.stats.kills)
    );

    return Number(participant.stats.champLevel > otherMaxChampLevel);
  },
};

export default goliath;
