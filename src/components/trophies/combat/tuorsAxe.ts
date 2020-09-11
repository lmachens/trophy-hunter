import { Trophy } from '../types';

const tuorsAxe: Trophy = {
  island: 'combatIsland',
  name: 'tuorsAxe',
  level: 'combat5',
  title: 'Tuors Axe',
  description:
    'Deal at least 50% more damage to champions than the next player.',
  category: 'combat',
  checkProgress: ({ match, participant }) => {
    const sortedParticipants = match.participants.sort(
      (participantA, participantB) => {
        return (
          participantB.stats.totalDamageDealtToChampions -
          participantA.stats.totalDamageDealtToChampions
        );
      }
    );
    const mostDamageParticipant = sortedParticipants[0];
    if (participant.participantId !== mostDamageParticipant.participantId) {
      return 0;
    }
    const secondMostDamageParticipant = sortedParticipants[1];

    return (
      (participant.stats.totalDamageDealtToChampions / 1.5) *
      secondMostDamageParticipant.stats.totalDamageDealtToChampions
    );
  },
};

export default tuorsAxe;
