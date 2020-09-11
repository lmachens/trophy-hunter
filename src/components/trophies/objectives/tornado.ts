import { Trophy } from '../types';

const tornado: Trophy = {
  island: 'objectivesIsland',
  name: 'tornado',
  level: 'objectives6',
  title: 'Tornado',
  description: 'Kill three air dragons.',
  category: 'objectives',
  checkProgress: ({ match, events, participant }) => {
    const teamIds = match.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId === participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const airDragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterSubType === 'AIR_DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    return airDragonKills / 3;
  },
  checkLive: ({ events, allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const airDragonKills = events.filter(
      (event) =>
        event.EventName === 'DragonKill' &&
        event.DragonType === 'Air' &&
        teamNames.includes(event.KillerName)
    ).length;

    return airDragonKills / 3;
  },
};

export default tornado;
