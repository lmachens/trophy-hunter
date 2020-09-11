import { Trophy } from '../types';
import { getParticipantKillsAndAssists } from '../../../api/riot/helpers';

const teamEffort: Trophy = {
  island: 'teamworkIsland',
  name: 'teamEffort',
  level: 'teamwork1',
  title: 'Team Effort',
  description:
    'Be part of at least three kills with everyone of your team involved.',
  category: 'teamwork',
  checkProgress: ({ events, participant }) => {
    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const teamEffortKills = killsAndAssists.filter(
      (event) => event.assistingParticipantIds.length >= 4
    ).length;

    return teamEffortKills / 3;
  },
  checkLive: ({ events, account }) => {
    const teamEffortKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        (event.KillerName === account.summoner.name ||
          event.Assisters.includes(account.summoner.name)) &&
        event.Assisters.length >= 4
    ).length;

    return teamEffortKills / 3;
  },
};

export default teamEffort;
