import { Trophy } from '../types';

const superiorBrain: Trophy = {
  island: 'combat',
  name: 'superiorBrain',
  level: 'combat5',
  title: 'Superior Brain',
  description:
    'Have more than twice damage to enemy champions than damage taken.',
  category: 'combat',
  checkProgress: ({ participant }) => {
    const damageDealtToTakenRatio =
      participant.stats.totalDamageDealtToChampions /
      Math.max(1, participant.stats.totalDamageTaken);

    return damageDealtToTakenRatio / 2;
  },
};

export default superiorBrain;
