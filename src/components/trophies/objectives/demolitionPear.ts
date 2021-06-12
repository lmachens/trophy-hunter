import { Trophy } from '../types';

const demolitionPear: Trophy = {
  island: 'combat',
  name: 'demolitionPear',
  level: 'objectives3',
  title: 'Demolition Pear',
  description: 'Takedown at least 5 turrets.',
  category: 'objectives',
  checkProgress: ({ participant }) => {
    return participant.turretKills / 5;
  },
  checkLive: ({ events, account }) => {
    const turretKills = events.filter(
      (event) =>
        event.EventName === 'TurretKilled' &&
        event.KillerName === account.summoner.name
    ).length;

    return turretKills / 5;
  },
};

export default demolitionPear;
