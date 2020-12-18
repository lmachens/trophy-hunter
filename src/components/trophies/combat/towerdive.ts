import { Trophy } from '../types';
import {
  isInEnemyTurretRange,
  getParticipantDeaths,
  getParticipantKills,
} from '../../../api/riot/helpers';

const towerdive: Trophy = {
  island: 'combat',
  name: 'towerdive',
  level: 'combat3',
  title: 'Towerdive',
  description:
    'Kill an opponent underneath his turret before the first turret falls without dying in the next 10 seconds.',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    const deaths = getParticipantDeaths(events, participant.participantId);
    const kills = getParticipantKills(events, participant.participantId);
    const firstTurrentDeath = events.find(
      (event) =>
        event.type === 'BUILDING_KILL' &&
        event.buildingType === 'TOWER_BUILDING'
    );
    if (!firstTurrentDeath) {
      return 0;
    }

    const underTurretKills = kills.filter((kill) => {
      const preFirstTurretDeath = kill.timestamp <= firstTurrentDeath.timestamp;
      const isUnderTurret = isInEnemyTurretRange(
        kill.position,
        participant.teamId
      );
      const notDiedInThe10SecsBeforeOrAfter = !deaths.find(
        (death) =>
          death.timestamp + 10000 >= kill.timestamp &&
          death.timestamp - 10000 < kill.timestamp
      );

      return (
        isUnderTurret && preFirstTurretDeath && notDiedInThe10SecsBeforeOrAfter
      );
    }).length;

    return underTurretKills;
  },
};

export default towerdive;
