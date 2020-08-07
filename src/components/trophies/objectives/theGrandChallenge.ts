import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const theGrandChallenge: Trophy = {
  island: 'objectivesIsland',
  name: 'theGrandChallenge',
  level: 'objectives5',
  title: 'The Grand Challenge',
  description:
    'Get a solo-kill and take an inhib-turret or an inhibitor in the 20 seconds after that.',
  category: 'objectives',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    const buildingKills = events.filter(
      (event) =>
        (event.killerId === participant.participantId ||
          event.assistingParticipantIds.some(
            (id) => id === participant.participantId
          )) &&
        (event.buildingType === 'INHIBITOR_BUILDING' ||
          (event.buildingType === 'TOWER_BUILDING' &&
            event.towerType === 'BASE_TOWER'))
    );

    const validKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.assistingParticipantIds.length === 0 &&
        buildingKills.some(
          (buildingKill) =>
            buildingKill.timestamp >= event.timestamp &&
            event.timestamp + 20000 >= buildingKill.timestamp
        )
    );

    return validKills.length;
  },
  checkLive: ({ events, account }) => {
    const buildingKills = events.filter(
      (event) =>
        (event.EventName === 'TurretKilled' ||
          event.EventName === 'InhibKilled') &&
        (event.KillerName === account.summoner.name ||
          event.Assisters.some(
            (assister) => assister === account.summoner.name
          ))
    );
    const validKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.Assisters.length === 0 &&
        buildingKills.some(
          (buildingKill) =>
            buildingKill.EventTime >= event.EventTime &&
            event.EventTime + 20 >= buildingKill.EventTime
        )
    );
    return validKills.length;
  },
};

export default theGrandChallenge;
