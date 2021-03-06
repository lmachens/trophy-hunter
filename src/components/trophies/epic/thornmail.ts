import { Trophy } from '../types';

const thornmail: Trophy = {
  island: 'epic',
  name: 'thornmail',
  level: 'epic2',
  title: 'Thornmail',
  description:
    'It takes a lot to kill you. On average you tank (damage taken + self mitigated damage) more than 40000 damage before going down.',
  category: 'epic',
  checkProgress: ({ participant }) => {
    const damageTankedPerDeath =
      (participant.stats.totalDamageTaken +
        participant.stats.damageSelfMitigated) /
      Math.max(participant.stats.deaths, 1);

    return damageTankedPerDeath / 40000;
  },
};

export default thornmail;
