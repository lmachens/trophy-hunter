import { Trophy } from '../types';

const deepSea: Trophy = {
  island: 'combat',
  name: 'deepSea',
  level: 'objectives3',
  title: 'Deep Sea',
  description: 'Kill three water dragons on the same match.',
  category: 'objectives',
  checkProgress: ({ match, events, participant }) => {
    const teamIds = match.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId === participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const waterDragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterSubType === 'WATER_DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    return waterDragonKills / 3;
  },
  checkLive: ({ events, allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const waterDragonKills = events.filter(
      (event) =>
        event.EventName === 'DragonKill' &&
        event.DragonType === 'Water' &&
        teamNames.includes(event.KillerName)
    ).length;

    return waterDragonKills / 3;
  },
};

export default deepSea;
