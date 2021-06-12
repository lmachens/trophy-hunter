import { Trophy } from '../types';

const wormMasher: Trophy = {
  island: 'epic',
  name: 'wormMasher',
  level: 'epic2',
  title: 'Worm Masher',
  description:
    'Kill the giant worm called Baron Nashor three times in a match.',
  category: 'epic',
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
    return baronKills / 3;
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

    return baronKills / 3;
  },
};

export default wormMasher;
