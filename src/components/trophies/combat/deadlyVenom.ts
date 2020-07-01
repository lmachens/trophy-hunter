import { Trophy } from '../types';
import { getParticipantIdentity } from '../../../api/riot/helpers';

const deadlyVenom: Trophy = {
  island: 'combatIsland',
  name: 'deadlyVenom',
  level: 'combat2',
  title: 'Deadly Venom',
  description:
    'Deal at least 25% more damage to champions than the next player.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );
    const highDamageParticipant = match.participants.find(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.stats.totalDamageDealtToChampions * 1.25 >=
          participant.stats.totalDamageDealtToChampions
    );

    return Number(highDamageParticipant);
  },
};

export default deadlyVenom;
