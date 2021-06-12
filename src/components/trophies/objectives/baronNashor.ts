import { Trophy } from '../types';

const baronNashor: Trophy = {
  island: 'combat',
  name: 'baronNashor',
  level: 'objectives1',
  title: 'Baron Nashor',
  description:
    'Kill the giant worm called Baron Nashor twice on the same match.',
  category: 'objectives',
  checkProgress: ({ match, events, participant }) => {
    const teamIds = match.info.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId === participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const baronKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'BARON_NASHOR' &&
        teamIds.includes(event.killerId)
    ).length;
    return baronKills / 2;
  },
  checkLive: ({ events, allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const baronKills = events.filter(
      (event) =>
        event.EventName === 'BaronKill' && teamNames.includes(event.KillerName)
    ).length;

    return baronKills / 2;
  },
};

export default baronNashor;
