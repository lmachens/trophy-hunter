import { Trophy } from '../types';

const superiorPosition: Trophy = {
  island: 'combat',
  name: 'superiorPosition',
  level: 'combat1',
  title: 'Superior Position',
  description:
    'Have more than 1.34 times more damage dealt to champions than damage taken.',
  category: 'combat',
  checkProgress: ({ participant }) => {
    const damageDealtToTakenRatio =
      participant.totalDamageDealtToChampions /
      Math.max(1, participant.totalDamageTaken);
    return damageDealtToTakenRatio / 1.34;
  },
};

export default superiorPosition;
