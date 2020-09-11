import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const energized: Trophy = {
  island: 'combatIsland',
  name: 'energized',
  level: 'objectives1',
  title: 'Energized',
  description: 'Take down at least 5 buildings during a baron buff.',
  category: 'objectives',
  maxProgress: 5,
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);
    const teamIds = match.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId === participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const buildingKills = events.filter(
      (event) =>
        event.type === 'BUILDING_KILL' && event.teamId === participant.teamId
    );

    const baronKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'BARON_NASHOR' &&
        teamIds.includes(event.killerId)
    );

    const energizedScore = Math.max(
      ...baronKills.map(
        (event) =>
          buildingKills.filter(
            (buildingKill) =>
              buildingKill.timestamp < event.timestamp + 210000 &&
              buildingKill.timestamp > event.timestamp
          ).length
      ),
      0
    );

    const trophyProgress = getTrophyProgress(account, 'energized');
    return energizedScore / 5 + trophyProgress;
  },
  checkLive: ({ allPlayers, events, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const buildingKills = events.filter(
      (event) =>
        (event.EventName === 'TurretKilled' ||
          event.EventName === 'InhibKilled') &&
        teamNames.includes(event.KillerName)
    );

    const baronKills = events.filter(
      (event) =>
        event.EventName === 'BaronKill' && teamNames.includes(event.KillerName)
    );

    const energizedScore = Math.max(
      ...baronKills.map(
        (event) =>
          buildingKills.filter(
            (buildingKill) =>
              buildingKill.EventTime < event.EventTime + 210 &&
              buildingKill.EventTime > event.EventTime
          ).length
      )
    );

    const trophyProgress = getTrophyProgress(account, 'energized');
    return energizedScore / 5 + trophyProgress;
  },
};

export default energized;
