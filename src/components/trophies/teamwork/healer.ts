import { Trophy } from '../types';

const healer: Trophy = {
  island: 'teamworkIsland',
  name: 'healer',
  level: 'teamwork7',
  title: 'Healer',
  description: 'Heal five players and at least 25000 damage.',
  category: 'teamwork',
  checkProgress: ({ participant }) => {
    return Number(
      participant.stats.totalHeal >= 25000 &&
        participant.stats.totalUnitsHealed >= 5
    );
  },
};

export default healer;
