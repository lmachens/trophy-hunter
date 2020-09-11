import { Trophy } from '../types';

const sinisterBlades: Trophy = {
  island: 'combatIsland',
  name: 'sinisterBlades',
  level: 'combat6',
  title: 'Sinister Blades',
  description:
    'Achieve at least four multikills (double-, triple-, quadra- or pentakill).',
  category: 'combat',
  checkProgress: ({ participant }) => {
    return participant.stats.doubleKills / 5;
  },
  checkLive: ({ events, account }) => {
    const multikills = events.filter(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name
    ).length;
    return multikills / 5;
  },
};

export default sinisterBlades;
