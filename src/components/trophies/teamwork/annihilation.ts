import { Trophy, Event } from '../types';
import { getParticipantKillsAndAssists } from '../../../api/riot/helpers';
import { zip } from '../../../api/utils/arrays';
import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';

const annihilation: Trophy = {
  island: 'teamwork',
  name: 'annihilation',
  level: 'teamwork6',
  title: 'Annihilation',
  description: `Be involved in 5 kills in 25 seconds.\nARAM: Achieve this twice in 1 game`,
  category: 'teamwork',
  aramSupport: true,
  checkProgress: ({ events, participant, match }) => {
    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const annihilations = zip(killsAndAssists, killsAndAssists.slice(4)).filter(
      (event) => event[1] && event[0].timestamp + 25000 >= event[1].timestamp
    ).length;

    if (match.info.queueId === ARAM_HOWLING_ABYSS) {
      return annihilations / 2;
    }
    return annihilations;
  },
  checkLive: ({ events, account, gameData }) => {
    const killsAndAssists = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        (event.KillerName === account.summoner.name ||
          event.Assisters.includes(account.summoner.name))
    );
    const annihilations = zip(killsAndAssists, killsAndAssists.slice(4)).filter(
      ([a, b]: [Event, Event]) => b && a.EventTime + 25 >= b.EventTime
    ).length;

    if (gameData.gameMode === 'ARAM') {
      return annihilations / 2;
    }
    return annihilations;
  },
};

export default annihilation;
