import { Trophy, Event } from '../types';
import {
  getParticipantByAccount,
  getParticipantKillsAndAssists,
} from '../../../api/riot/helpers';
import { zip } from '../../../api/utils/arrays';

const annihilation: Trophy = {
  island: 'teamworkIsland',
  name: 'annihilation',
  level: 'teamwork6',
  title: 'Annihilation',
  description: 'Be involved in 5 kills in 15 seconds.',
  category: 'teamwork',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const annihilations = zip(killsAndAssists, killsAndAssists.slice(4)).filter(
      (event) => event[1] && event[0].timestamp + 15000 >= event[1].timestamp
    ).length;

    return annihilations;
  },
  checkLive: ({ events, account }) => {
    const killsAndAssists = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        (event.KillerName === account.summoner.name ||
          event.Assisters.includes(account.summoner.name))
    );
    const annihilations = zip(killsAndAssists, killsAndAssists.slice(4)).filter(
      ([a, b]: [Event, Event]) => b && a.EventTime + 15 >= b.EventTime
    ).length;

    return annihilations;
  },
};

export default annihilation;
