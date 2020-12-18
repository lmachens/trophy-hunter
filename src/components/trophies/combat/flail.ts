import { Trophy } from '../types';
import { Participant } from '../../../api/riot/types';

const calculateDamagePerGold = (participant: Participant) => {
  return (
    participant.stats.totalDamageDealtToChampions / participant.stats.goldEarned
  );
};

const flail: Trophy = {
  island: 'combat',
  name: 'flail',
  level: 'combat1',
  title: 'Flail',
  description:
    'Have the highest damage to champions output per gold. (damage / gold works similar to KDA)',
  category: 'combat',
  checkProgress: ({ match, participant }) => {
    const sortedParticipants = match.participants.sort(
      (participantA, participantB) => {
        return (
          calculateDamagePerGold(participantB) -
          calculateDamagePerGold(participantA)
        );
      }
    );
    const mostDamagePerGoldParticipant = sortedParticipants[0];

    return (
      calculateDamagePerGold(participant) /
      calculateDamagePerGold(mostDamagePerGoldParticipant)
    );
  },
};

export default flail;
