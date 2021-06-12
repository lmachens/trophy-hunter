import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { BuildingKillEvent } from '../../../api/riot/types';
import { Trophy } from '../types';

const theCannon: Trophy = {
  island: 'objectives',
  name: 'theCannon',
  level: 'objectives3',
  title: 'The Cannon',
  description: `Participate in a first turret kill before ten minutes into the game.\nARAM: Five minutes`,
  category: 'objectives',
  aramSupport: true,
  checkProgress: ({ participant, events, match }) => {
    const firstTurretDeath = <BuildingKillEvent>(
      events.find(
        (event) =>
          event.type === 'BUILDING_KILL' &&
          event.buildingType === 'TOWER_BUILDING'
      )
    );
    if (!firstTurretDeath) {
      return 0;
    }
    const requiredMinutes = match.info.queueId === ARAM_HOWLING_ABYSS ? 5 : 10;
    const isEarly = firstTurretDeath.timestamp < requiredMinutes * 60 * 1000;
    const isKiller = firstTurretDeath.killerId === participant.participantId;
    const isAssistant = firstTurretDeath.assistingParticipantIds.some(
      (id) => id === participant.participantId
    );
    return Number(isEarly && (isKiller || isAssistant));
  },
  checkLive: ({ events, account, gameData }) => {
    const firstTurretDeath = events.find(
      (event) => event.EventName === 'TurretKilled'
    );
    if (!firstTurretDeath) {
      return 0;
    }
    const requiredMinutes = gameData.gameMode === 'ARAM' ? 5 : 10;
    const isEarly = firstTurretDeath.EventTime < requiredMinutes * 60;
    const isKiller = firstTurretDeath.KillerName === account.summoner.name;
    const isAssistant = firstTurretDeath.Assisters.some(
      (assister) => assister === account.summoner.name
    );
    return Number(isEarly && (isKiller || isAssistant));
  },
};

export default theCannon;
