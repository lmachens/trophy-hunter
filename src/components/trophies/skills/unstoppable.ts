import { Trophy } from '../types';

const unstoppable: Trophy = {
  island: 'skills',
  name: 'unstoppable',
  level: 'skills2',
  title: 'Unstoppable',
  description: 'Achieve a killing spree of five.',
  category: 'skills',
  checkProgress: ({ participant }) => {
    return participant.stats.largestKillingSpree / 5;
  },
  checkLive: ({ events, account }) => {
    const killsAndDeaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        (event.KillerName === account.summoner.name ||
          event.VictimName === account.summoner.name)
    );

    const killingSprees = killsAndDeaths
      .map((event, index) => {
        if (event.KillerName === account.summoner.name) {
          const killingSpree = killsAndDeaths
            .slice(index + 1)
            .findIndex(
              (element) => element.VictimName === account.summoner.name
            );
          return killingSpree;
        }
        return 0;
      })
      .filter((killingSpree) => killingSpree > 0);
    const largestKillingSpree = Math.max(...killingSprees);
    return largestKillingSpree / 5;
  },
};

export default unstoppable;
