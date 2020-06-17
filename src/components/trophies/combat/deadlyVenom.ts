import { Trophy } from '../types';

const deadlyVenom: Trophy = {
  island: 'hubIsland',
  name: 'deadlyVenom',
  level: 'combat2',
  title: 'Deadly Venom',
  description:
    'Deal at least 25% more damage to champions than the next player. (from 50%: Tuors Axe)',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participantIdentity = match.participantIdentities.find(
      (participantIdentity) =>
        participantIdentity.player.accountId === account.summoner.accountId
    );
    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );
    participant.stats.totalDamageDealtToChampions;
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
