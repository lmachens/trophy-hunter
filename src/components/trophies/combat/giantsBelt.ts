import { Trophy } from '../types';

const giantsBelt: Trophy = {
  island: 'combat',
  name: 'giantsBelt',
  level: 'combat8',
  title: 'Giants Belt',
  description:
    'It takes a lot to kill you. On Average you tank more than 20000 damage before going down.',
  category: 'combat',
  checkProgress: ({ participant }) => {
    const damageTankedPerDeath =
      (participant.totalDamageTaken + participant.damageSelfMitigated) /
      Math.max(participant.deaths, 1);

    return Number(damageTankedPerDeath >= 20000);
  },
};

export default giantsBelt;
