import { Trophy } from '../types';

const clothArmor: Trophy = {
  island: 'combat',
  name: 'clothArmor',
  level: 'combat3',
  title: 'Cloth Armor',
  description:
    'It takes a lot to kill you. On Average you tank more than 10000 damage before going down.',
  category: 'combat',
  checkProgress: ({ participant }) => {
    const damageTankedPerDeath =
      (participant.totalDamageTaken + participant.damageSelfMitigated) /
      Math.max(participant.deaths, 1);

    return damageTankedPerDeath / 10000;
  },
};

export default clothArmor;
