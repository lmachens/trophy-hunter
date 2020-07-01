import { Trophy } from '../types';
import { getParticipantIdentity } from '../../../api/riot/helpers';

const bombardment: Trophy = {
  island: 'combatIsland',
  name: 'bombardment',
  level: 'combat2',
  title: 'Bombardment',
  description: 'Deal more than 1000 damage to champions per minute.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );
    return Number(
      (60 * participant.stats.totalDamageDealtToChampions) /
        match.gameDuration >
        1000
    );
  },
};

export default bombardment;
