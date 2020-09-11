import { Trophy } from '../types';

const explosiveCharge: Trophy = {
  island: 'objectivesIsland',
  name: 'explosiveCharge',
  level: 'objectives2',
  title: 'Explosive Charge',
  description: 'Deal more than 10000 damage to turrets.',
  category: 'objectives',
  checkProgress: ({ participant }) => {
    return participant.stats.damageDealtToTurrets / 10000;
  },
};

export default explosiveCharge;
