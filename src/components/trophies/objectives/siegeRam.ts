import { Trophy } from '../types';

const siegeRam: Trophy = {
  island: 'hub',
  name: 'siegeRam',
  level: 'hubObjectives',
  title: 'Siege Ram',
  description: 'Have most damage dealt to turrets of your team.',
  category: 'objectives',
  checkProgress: ({ match, participant }) => {
    const otherTeamParticipants = match.info.participants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.teamId === participant.teamId
    );
    const maxDamageDealtToTurrets = Math.max(
      ...otherTeamParticipants.map(
        (teamParticipant) => teamParticipant.damageDealtToTurrets
      )
    );

    return participant.damageDealtToTurrets > 0
      ? participant.damageDealtToTurrets / maxDamageDealtToTurrets
      : 0;
  },
};

export default siegeRam;
