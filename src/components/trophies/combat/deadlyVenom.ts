import { Trophy } from '../types';

const deadlyVenom: Trophy = {
  island: 'combat',
  name: 'deadlyVenom',
  level: 'combat2',
  title: 'Deadly Venom',
  description:
    'Deal at least 25% more damage to champions than the next player.',
  category: 'combat',
  checkProgress: ({ match, participant }) => {
    const sortedParticipants = match.info.participants.sort(
      (a, b) => b.totalDamageDealtToChampions - a.totalDamageDealtToChampions
    );
    const otherParticipants = sortedParticipants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId
    );
    const highestDamageParticipant = otherParticipants[0];

    const progress =
      participant.totalDamageDealtToChampions /
      highestDamageParticipant.totalDamageDealtToChampions /
      1.25;

    return progress;
  },
};

export default deadlyVenom;
