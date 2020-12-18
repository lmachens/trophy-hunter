import { Trophy } from '../types';

const siegeRam: Trophy = {
  island: 'hub',
  name: 'siegeRam',
  level: 'hubObjectives',
  title: 'Siege Ram',
  description: 'Have most damage dealt to turrets of your team.',
  category: 'objectives',
  checkProgress: ({ match, participant }) => {
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

    return participant.stats.damageDealtToTurrets > 0
      ? participant.stats.damageDealtToTurrets / maxDamageDealtToTurrets
      : 0;
  },
};

export default siegeRam;
