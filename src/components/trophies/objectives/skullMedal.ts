import { Trophy } from '../types';

const skullMedal: Trophy = {
  island: 'objectivesIsland',
  name: 'skullMedal',
  level: 'objectives2',
  title: 'Skull Medal',
  description: 'Score two killing sprees and destruct at least two inhibitors.',
  category: 'objectives',
  checkProgress: ({ participant }) => {
    return Number(
      participant.stats.killingSprees >= 2 &&
        participant.stats.inhibitorKills >= 2
    );
  },
  checkLive: ({ events, account }) => {
    const killingSprees = events.filter(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name
    ).length;
    const inhibitorKills = events.filter(
      (event) =>
        event.EventName === 'InhibKilled' &&
        event.KillerName === account.summoner.name
    ).length;

    return (
      (Math.min(1, killingSprees / 2) + Math.min(1, inhibitorKills / 2)) / 2
    );
  },
};

export default skullMedal;
