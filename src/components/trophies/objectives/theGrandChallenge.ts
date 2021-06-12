import { getParticipantSoloKills } from '../../../api/riot/helpers';
import { Trophy } from '../types';

const theGrandChallenge: Trophy = {
  island: 'objectives',
  name: 'theGrandChallenge',
  level: 'objectives5',
  title: 'The Grand Challenge',
  description:
    'Get a solo-kill and take an inhib-turret or an inhibitor in the 25 seconds after that.',
  category: 'objectives',
  checkProgress: ({ events, participant }) => {
    const soloKills = getParticipantSoloKills(
      events,
      participant.participantId
    );

    const buildingKills = events.filter(
      (event) =>
        event.type === 'BUILDING_KILL' &&
        (event.killerId === participant.participantId ||
          event.assistingParticipantIds.some(
            (id) => id === participant.participantId
          )) &&
        (event.buildingType === 'INHIBITOR_BUILDING' ||
          (event.buildingType === 'TOWER_BUILDING' &&
            event.towerType === 'BASE_TURRET'))
    );

    const validKills = soloKills.filter((event) =>
      buildingKills.some(
        (buildingKill) =>
          buildingKill.timestamp >= event.timestamp &&
          event.timestamp + 25000 >= buildingKill.timestamp
      )
    );

    return validKills.length;
  },
  checkLive: ({ events, account }) => {
    const soloKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.Assisters.length === 0
    );

    const buildingKills = events.filter(
      (event) =>
        (event.EventName === 'TurretKilled' ||
          event.EventName === 'InhibKilled') &&
        (event.KillerName === account.summoner.name ||
          event.Assisters.some(
            (assister) => assister === account.summoner.name
          ))
    );
    const validKills = soloKills.filter((event) =>
      buildingKills.some(
        (buildingKill) =>
          buildingKill.EventTime >= event.EventTime &&
          event.EventTime + 25 >= buildingKill.EventTime
      )
    );
    return validKills.length;
  },
};

export default theGrandChallenge;
