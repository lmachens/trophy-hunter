import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const dominating: Trophy = {
  island: 'skillsIsland',
  name: 'dominating',
  level: 'skills1',
  title: 'Dominating',
  description: 'Achieve a killing spree of 6.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return participant.stats.largestKillingSpree / 6;
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
    return largestKillingSpree / 6;
  },
};

export default dominating;
