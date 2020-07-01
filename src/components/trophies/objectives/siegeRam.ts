import { Trophy } from '../types';
import { getParticipantIdentity } from '../../../api/riot/helpers';

const siegeRam: Trophy = {
  island: 'hubIsland',
  name: 'siegeRam',
  level: 'hubObjectives',
  title: 'Siege Ram',
  description: 'Have most damage dealt to turrets of your team.',
  category: 'objectives',
  checkProgress: ({ match, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );
    const otherTeamParticipants = match.participants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.teamId === participant.teamId
    );
    const maxDamageDealtToTurrets = Math.max(
      ...otherTeamParticipants.map(
        (teamParticipant) => teamParticipant.stats.damageDealtToTurrets
      )
    );

    return Number(
      participant.stats.damageDealtToTurrets >= maxDamageDealtToTurrets &&
        participant.stats.damageDealtToTurrets > 0
    );
  },
};

export default siegeRam;
