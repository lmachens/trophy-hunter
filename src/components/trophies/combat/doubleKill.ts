import { Trophy } from '../types';

const doubleKill: Trophy = {
  island: 'combat',
  name: 'doubleKill',
  level: 'combat1',
  title: 'Double Kill',
  description: 'Achieve a double kill.',
  category: 'combat',
  checkProgress: ({ participant }) => {
    return participant.doubleKills;
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
