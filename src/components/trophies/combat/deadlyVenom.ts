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
    const sortedParticipants = match.participants.sort(
      (a, b) =>
        b.stats.totalDamageDealtToChampions -
        a.stats.totalDamageDealtToChampions
    );
    const otherParticipants = sortedParticipants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId
    );
    const highestDamageParticipant = otherParticipants[0];

    const progress =
      participant.stats.totalDamageDealtToChampions /
      highestDamageParticipant.stats.totalDamageDealtToChampions /
      1.25;

    return progress;
  },
};

export default deadlyVenom;
