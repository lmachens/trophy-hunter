import { Trophy } from '../types';

const smartness: Trophy = {
  island: 'combat',
  name: 'smartness',
  level: 'combat2',
  title: 'Smartness',
  description:
    'Score a killing spree, at least ten assists and die at most five times.',
  category: 'combat',
  checkProgress: ({ participant }) => {
    const hasKillingSpree = Number(participant.stats.killingSprees >= 1);
    const hasTenAssists = Number(participant.stats.assists >= 10);
    const hasLessThanFiveDeaths = Number(participant.stats.deaths <= 5);

    return (hasKillingSpree + hasTenAssists + hasLessThanFiveDeaths) / 3;
  },
  checkLive: ({ events, account }) => {
    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    ).length;
    if (deaths > 5) {
      return 0;
    }

    const killingSprees = events.filter(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name
    ).length;
    const assists = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters.includes(account.summoner.name)
    ).length;

    return (Math.min(1, killingSprees) + Math.min(1, assists / 10)) / 2.1;
  },
};

export default smartness;
