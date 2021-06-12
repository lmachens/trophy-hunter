import { Trophy } from '../types';

const dusk: Trophy = {
  island: 'teamwork',
  name: 'dusk',
  level: 'teamwork3',
  title: 'Dusk',
  description: 'Destroy at least six enemy wards.',
  category: 'teamwork',
  checkProgress: ({ participant }) => {
    return participant.wardsKilled / 6;
  },
};

export default dusk;
