import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const theSphinx: Trophy = {
  island: 'combatIsland',
  name: 'theSphinx',
  level: 'objectives6',
  title: 'The Sphinx',
  description: 'Kill three earth dragons.',
  category: 'objectives',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    const teamIds = match.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId === participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const earthDragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterSubType === 'EARTH_DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    return earthDragonKills / 3;
  },
  checkLive: ({ events, allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const earthDragonKills = events.filter(
      (event) =>
        event.EventName === 'DragonKill' &&
        event.DragonType === 'Earth' &&
        teamNames.includes(event.KillerName)
    ).length;

    return earthDragonKills / 3;
  },
};

export default theSphinx;
