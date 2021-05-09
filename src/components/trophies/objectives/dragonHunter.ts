import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';
import { getTeam } from '../../../api/riot/helpers';

const REQUIRED_DRAGONS = 5;

const dragonHunter: Trophy = {
  island: 'hub',
  name: 'dragonHunter',
  level: 'hubObjectives',
  title: 'Dragon Hunter',
  description: `Kill ${REQUIRED_DRAGONS} dragons (team achievement).`,
  category: 'objectives',
  maxProgress: REQUIRED_DRAGONS,
  checkProgress: ({ match, events, participant, account }) => {
    const teamIds = getTeam(match, participant.teamId).map(
      (teammate) => teammate.participantId
    );

    const dragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    const trophyProgress = getTrophyProgress(account, 'energized');
    return dragonKills / REQUIRED_DRAGONS + trophyProgress;
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

    const trophyProgress = getTrophyProgress(account, 'energized');
    return dragonKills / REQUIRED_DRAGONS + trophyProgress;
  },
};

export default dragonHunter;
