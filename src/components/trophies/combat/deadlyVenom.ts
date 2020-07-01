import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const deadlyVenom: Trophy = {
  island: 'combatIsland',
  name: 'deadlyVenom',
  level: 'combat2',
  title: 'Deadly Venom',
  description:
    'Deal at least 25% more damage to champions than the next player.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    const highDamageParticipant = !!match.participants.find(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.stats.totalDamageDealtToChampions * 1.25 >=
          participant.stats.totalDamageDealtToChampions
    );

    return Number(highDamageParticipant);
  },
};

export default deadlyVenom;
