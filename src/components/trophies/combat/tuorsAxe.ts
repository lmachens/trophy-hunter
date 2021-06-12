import { Trophy } from '../types';

const tuorsAxe: Trophy = {
  island: 'combat',
  name: 'tuorsAxe',
  level: 'combat5',
  title: 'Tuors Axe',
  description:
    'Deal at least 50% more damage to champions than the next player.',
  category: 'combat',
  checkProgress: ({ match, participant }) => {
    const sortedParticipants = match.info.participants.sort(
      (participantA, participantB) => {
        return (
          participantB.totalDamageDealtToChampions -
          participantA.totalDamageDealtToChampions
        );
      }
    );
    const mostDamageParticipant = sortedParticipants[0];
    if (participant.participantId !== mostDamageParticipant.participantId) {
      return 0;
    }
    const secondMostDamageParticipant = sortedParticipants[1];

    return (
      (participant.totalDamageDealtToChampions / 1.5) *
      secondMostDamageParticipant.totalDamageDealtToChampions
    );
  },
};

export default tuorsAxe;
