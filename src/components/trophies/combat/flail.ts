import { Trophy } from '../types';
import { Participant } from '../../../api/riot/types';
import { getParticipantIdentity } from '../../../api/riot/helpers';

const flail: Trophy = {
  island: 'combatIsland',
  name: 'flail',
  level: 'combat1',
  title: 'Flail',
  description:
    'Have the highest damage to champions output per gold. (damage / gold works similar to KDA)',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const calculateDamagePerGold = (participant: Participant) => {
      return (
        participant.stats.totalDamageDealtToChampions /
        participant.stats.goldEarned
      );
    };

    const sortedParticipants = match.participants.sort(
      (participantA, participantB) => {
        return (
          calculateDamagePerGold(participantB) -
          calculateDamagePerGold(participantA)
        );
      }
    );
    const mostDamagePerGoldParticipant = sortedParticipants[0];

    const participantIdentity = getParticipantIdentity(match, account);

    return Number(
      mostDamagePerGoldParticipant.participantId ===
        participantIdentity.participantId
    );
  },
};

export default flail;
