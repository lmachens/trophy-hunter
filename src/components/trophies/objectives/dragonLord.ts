import { Trophy } from '../types';

const dragonLord: Trophy = {
  island: 'combat',
  name: 'dragonLord',
  level: 'objectives2',
  title: 'Dragon Lord',
  description: 'Kill five dragons (team achievement).',
  category: 'objectives',
  checkProgress: ({ match, events, participant }) => {
    const teamIds = match.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId === participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const dragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    return dragonKills / 5;
  },
  checkLive: ({ events, allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const dragonKills = events.filter(
      (event) =>
        event.EventName === 'DragonKill' && teamNames.includes(event.KillerName)
    ).length;

    return dragonKills / 5;
  },
};

export default dragonLord;
