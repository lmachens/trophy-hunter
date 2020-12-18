import { Trophy } from '../types';

const intruder: Trophy = {
  island: 'skills',
  name: 'intruder',
  level: 'skills3',
  title: 'Intruder',
  description: 'Take at least 25 cs from the enemy jungle.',
  category: 'skills',
  checkProgress: ({ participant }) => {
    return Number(participant.stats.neutralMinionsKilledEnemyJungle >= 25);
  },
};

export default intruder;
