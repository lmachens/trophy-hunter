import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { getAllKills, getTeam } from '../../../api/riot/helpers';
import { Trophy } from '../types';

const locusts: Trophy = {
  island: 'hub',
  name: 'locusts',
  level: 'teamwork1',
  title: 'Locusts',
  description: `Your team scores at least ten kills with at least four of your team involved (team achievement).\nARAM: 12 kills with all of your team involved`,
  category: 'teamwork',
  aramSupport: true,
  checkProgress: ({ participant, events, match }) => {
    const teamIds = getTeam(match, participant.teamId).map(
      (teammate) => teammate.participantId
    );

    const locustsKillEvents = getAllKills(events).filter(
      (event) =>
        event.assistingParticipantIds.length >= 4 &&
        teamIds.includes(event.killerId)
    );
    const requiredKills = match.queueId === ARAM_HOWLING_ABYSS ? 12 : 10;
    return locustsKillEvents.length / requiredKills;
  },
  checkLive: ({ events, allPlayers, account, gameData }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const locustsKillEvents = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters?.length >= 4 &&
        teamNames.includes(event.KillerName)
    );
    const requiredKills = gameData.gameMode === 'ARAM' ? 12 : 10;
    return locustsKillEvents.length / requiredKills;
  },
};

export default locusts;
