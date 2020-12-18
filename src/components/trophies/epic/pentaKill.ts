import { Trophy } from '../types';

const pentaKill: Trophy = {
  island: 'epic',
  name: 'pentaKill',
  level: 'epic1',
  title: 'Penta Kill',
  description: 'Achieve a penta kill.',
  category: 'epic',
  checkProgress: ({ participant }) => {
    return participant.stats.pentaKills;
  },
  checkLive: ({ events, account }) => {
    const hasPentaKill = events.some(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillStreak === 5 &&
        event.KillerName === account.summoner.name
    );

    return Number(hasPentaKill);
  },
};

export default pentaKill;
