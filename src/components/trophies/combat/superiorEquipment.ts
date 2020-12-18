import { Trophy } from '../types';

const superiorEquipment: Trophy = {
  island: 'combat',
  name: 'superiorEquipment',
  level: 'combat5',
  title: 'Superior Equipment',
  description:
    'Have more than 1.67 times more damage dealt to champions than damage taken.',
  category: 'combat',
  checkProgress: ({ participant }) => {
    const damageDealtToTakenRatio =
      participant.stats.totalDamageDealtToChampions /
      Math.max(1, participant.stats.totalDamageTaken);

    return damageDealtToTakenRatio / 1.67;
  },
};

export default superiorEquipment;
