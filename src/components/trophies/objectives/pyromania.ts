import { Trophy } from '../types';

const pyromania: Trophy = {
  island: 'combat',
  name: 'pyromania',
  level: 'objectives4',
  title: 'Pyromania',
  description: 'Kill three fire dragons on the same match.',
  category: 'objectives',
  checkProgress: ({ match, events, participant }) => {
    const teamIds = match.info.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId === participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const fireDragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterSubType === 'FIRE_DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    return fireDragonKills / 3;
  },
  checkLive: ({ events, allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const fireDragonKills = events.filter(
      (event) =>
        event.EventName === 'DragonKill' &&
        event.DragonType === 'Fire' &&
        teamNames.includes(event.KillerName)
    ).length;

    return fireDragonKills / 3;
  },
};

export default pyromania;
