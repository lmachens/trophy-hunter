import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const dragonSlayer: Trophy = {
  island: 'combatIsland',
  name: 'dragonSlayer',
  level: 'objectives1',
  title: 'Dragon Slayer',
  description: 'Kill four dragons (team achievement).',
  category: 'objectives',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

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

    return dragonKills / 4;
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

    return dragonKills / 4;
  },
};

export default dragonSlayer;
