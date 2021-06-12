import { Trophy } from '../types';

const quackery: Trophy = {
  island: 'teamwork',
  name: 'quackery',
  level: 'teamwork4',
  title: 'Quackery',
  description: 'Heal five players and at least 15000 damage.',
  category: 'teamwork',
  checkProgress: ({ participant }) => {
    return Number(
      participant.totalHeal >= 15000 && participant.totalUnitsHealed >= 5
    );
  },
};

export default quackery;
