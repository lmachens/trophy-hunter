import { Trophy } from '../types';

const bombardment: Trophy = {
  island: 'combat',
  name: 'bombardment',
  level: 'combat2',
  title: 'Bombardment',
  description: 'Deal more than 1000 damage to champions per minute.',
  category: 'combat',
  checkProgress: ({ match, participant }) => {
    return (
      (60 * participant.stats.totalDamageDealtToChampions) /
      match.gameDuration /
      1000
    );
  },
};

export default bombardment;
