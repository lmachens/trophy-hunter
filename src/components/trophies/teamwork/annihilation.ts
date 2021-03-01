import { Trophy, Event } from '../types';
import { getParticipantKillsAndAssists } from '../../../api/riot/helpers';
import { zip } from '../../../api/utils/arrays';
import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { MatchEvents } from '../../../api/riot/types';

const getAnnihilations = (killsAndAssists: MatchEvents) =>
  zip(killsAndAssists, killsAndAssists.slice(4)).filter(
    (event) => event[1] && event[0].timestamp + 15000 >= event[1].timestamp
  ).length;

const annihilation: Trophy = {
  island: 'teamwork',
  name: 'annihilation',
  level: 'teamwork6',
  title: 'Annihilation',
  description: 'Be involved in 5 kills in 15 seconds.',
  category: 'teamwork',
  aramSupport: true,
  checkProgress: ({ events, participant, match }) => {
    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const annihilations = getAnnihilations(killsAndAssists);

    if (match.queueId === ARAM_HOWLING_ABYSS) {
      if (annihilations < 1) {
        return 0;
      }
      const moreKillsAndAssists = killsAndAssists.slice(5);
      const secondAnnihilations = getAnnihilations(moreKillsAndAssists);
      return secondAnnihilations;
    } else {
      return annihilations;
    }
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
