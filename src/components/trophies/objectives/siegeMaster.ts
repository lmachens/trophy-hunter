import { Trophy } from '../types';
import {
  isInEnemyTurretRange,
  getParticipantKills,
} from '../../../api/riot/helpers';

const siegeMaster: Trophy = {
  island: 'objectives',
  name: 'siegeMaster',
  level: 'objectives5',
  title: 'Siege Master',
  description:
    'Have most damage dealt to turrets and kill at least five opponents near their turrets',
  category: 'objectives',
  checkProgress: ({ match, events, participant }) => {
    const kills = getParticipantKills(events, participant.participantId);

    const underTurretKills = kills.filter((kill) => {
      const isUnderTurret = isInEnemyTurretRange(
        kill.position,
        participant.teamId
      );

      return isUnderTurret;
    }).length;

    const maxDamageDealtToTurrets = Math.max(
      ...match.info.participants.map(
        (participant) => participant.damageDealtToTurrets
      )
    );

    return Number(
      participant.damageDealtToTurrets >= maxDamageDealtToTurrets &&
        underTurretKills >= 5
    );
  },
};

export default siegeMaster;
