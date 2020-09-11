import { Trophy } from '../types';

const fullHouse: Trophy = {
  island: 'combatIsland',
  name: 'fullHouse',
  level: 'combat4',
  title: 'Full House',
  description: 'Achieve a doublekill and a triplekill.',
  category: 'combat',
  checkProgress: ({ participant }) => {
    const progress =
      Number(participant.stats.doubleKills > 0) +
      Number(participant.stats.tripleKills > 0);

    return progress / 2;
  },
  checkLive: ({ events, account }) => {
    const hasDoubleKill = events.some(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 2
    );
    const hasTripleKill = events.some(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 3
    );
    return (Number(hasDoubleKill) + Number(hasTripleKill)) / 2;
  },
};

export default fullHouse;
