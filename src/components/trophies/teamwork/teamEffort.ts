import { Trophy } from '../types';
import { getParticipantKillsAndAssists } from '../../../api/riot/helpers';
import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';

const teamEffort: Trophy = {
  island: 'teamwork',
  name: 'teamEffort',
  level: 'teamwork1',
  title: 'Team Effort',
  description: `Be part of at least three kills with everyone of your team involved.\nARAM: Ten kills`,
  category: 'teamwork',
  aramSupport: true,
  checkProgress: ({ events, participant, match }) => {
    const requiredTeamKills = match.queueId === ARAM_HOWLING_ABYSS ? 3 : 10;

    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const teamEffortKills = killsAndAssists.filter(
      (event) => event.assistingParticipantIds.length >= 4
    ).length;

    return teamEffortKills / requiredTeamKills;
  },
  checkLive: ({ events, account, gameData }) => {
    const requiredTeamKills = gameData.gameMode === 'ARAM' ? 3 : 10;

    const teamEffortKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        (event.KillerName === account.summoner.name ||
          event.Assisters.includes(account.summoner.name)) &&
        event.Assisters.length >= 4
    ).length;

    return teamEffortKills / requiredTeamKills;
  },
};

export default teamEffort;
