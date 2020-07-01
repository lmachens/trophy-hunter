import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const doubleKill: Trophy = {
  island: 'combatIsland',
  name: 'doubleKill',
  level: 'combat1',
  title: 'Double Kill',
  description: 'Achieve a double kill.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return participant.stats.doubleKills;
  },
  checkLive: ({ events, trophyData, account }) => {
    if (!events.length || trophyData.doubleKill) {
      return 0;
    }

    const doubleKill = events.find(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 2
    );

    if (doubleKill) {
      trophyData.doubleKill = true;
    }

    return Number(doubleKill);
  },
};

export default doubleKill;
