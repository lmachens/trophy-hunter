import { Trophy } from '../types';
import {
  isInEnemyTurretRange,
  getParticipantByAccount,
} from '../../../api/riot/helpers';
import { MatchEvent } from '../../../api/riot/types';

const towerdive: Trophy = {
  island: 'combatIsland',
  name: 'towerdive',
  level: 'combat3',
  title: 'Towerdive',
  description:
    'Kill an opponent underneath his turret before the first turret falls without dying in the next 10 seconds.',
  category: 'combat',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    const deaths = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.victimId === participant.participantId
    );
    const kills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId
    );
    const firstTurrentDeath = events.find(
      (event) =>
        event.type === 'BUILDING_KILL' &&
        event.buildingType === 'TOWER_BUILDING'
    );

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
