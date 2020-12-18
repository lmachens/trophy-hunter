import { Trophy } from '../types';

const curse: Trophy = {
  island: 'combat',
  name: 'curse',
  level: 'combat7',
  title: 'Curse',
  description: 'The total crowd control time that you dealt exceeds one hour.',
  category: 'combat',
  checkProgress: ({ participant }) => {
    return participant.stats.totalTimeCrowdControlDealt / 3600;
  },
};

export default curse;
