import { Trophy } from '../types';
import { getParticipantKillsAndAssists } from '../../../api/riot/helpers';

const theWanderer: Trophy = {
  island: 'combatIsland',
  name: 'theWanderer',
  level: 'combat7',
  title: 'The Wanderer',
  description:
    'Participate in a kill on each opponent pre 15 minutes as a botlaner.',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    if (participant.timeline.lane !== 'BOTTOM') {
      return 0;
    }
    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    ).filter((event) => event.timestamp < 15 * 60 * 1000);
    const victimIds = killsAndAssists.map((event) => event.victimId);

    const uniqueVictims = victimIds.filter(
      (victimId, index, current) => current.indexOf(victimId) === index
    ).length;

    return uniqueVictims / 5;
  },
  checkLive: ({ events, account }) => {
    const killsBefore15 = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        (event.KillerName === account.summoner.name ||
          event.Assisters.includes(account.summoner.name)) &&
        event.EventTime < 15 * 60
    );
    const victimNames = killsBefore15.map((event) => event.VictimName);

    const uniqueVictims = victimNames.filter(
      (victimName, index, current) => current.indexOf(victimName) === index
    ).length;
    return uniqueVictims / 5;
  },
};

export default theWanderer;
