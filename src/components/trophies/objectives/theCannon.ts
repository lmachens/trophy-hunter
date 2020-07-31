import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const theCannon: Trophy = {
  island: 'combatIsland',
  name: 'theCannon',
  level: 'objectives3',
  title: 'The Cannon',
  description:
    'Participate in a first turret kill before ten minutes into the game.',
  category: 'objectives',
  checkProgress: ({ match, account, events }) => {
    const participant = getParticipantByAccount(match, account);

    const firstTurretDeath = events.find(
      (event) =>
        event.type === 'BUILDING_KILL' &&
        event.buildingType === 'TOWER_BUILDING'
    );
    const isEarly = firstTurretDeath.timestamp < 10 * 60 * 1000;
    const isKiller = firstTurretDeath.killerId === participant.participantId;
    const isAssistant = firstTurretDeath.assistingParticipantIds.some(
      (id) => id === participant.participantId
    );
    return Number(isEarly && (isKiller || isAssistant));
  },
  checkLive: ({ events, account }) => {
    const firstTurretDeath = events.find(
      (event) => event.EventName === 'TurretKilled'
    );

    const isEarly = firstTurretDeath.EventTime < 10 * 60;
    const isKiller = firstTurretDeath.KillerName === account.summoner.name;
    const isAssistant = firstTurretDeath.Assisters.some(
      (assister) => assister === account.summoner.name
    );
    return Number(isEarly && (isKiller || isAssistant));
  },
};

export default theCannon;
