import { Trophy } from '../types';

const quadraKill: Trophy = {
  island: 'combatIsland',
  name: 'quadraKill',
  level: 'combat8',
  title: 'Quadra Kill',
  description: 'Achieve a quadra kill.',
  category: 'combat',
  checkProgress: ({ participant }) => {
    return participant.stats.quadraKills;
  },
  checkLive: ({ events, account }) => {
    const quadraKill = events.find(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 4
    );

    return Number(quadraKill);
  },
};

export default quadraKill;
