import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const thornmail: Trophy = {
  island: 'epicIsland',
  name: 'thornmail',
  level: 'epic2',
  title: 'Thornmail',
  description:
    'It takes a lot to kill you. On Average you tank (damage taken + self mitigated damage) more than 40000 damage before going down.',
  category: 'epic',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const damageTankedPerDeath =
      (participant.stats.totalDamageTaken +
        participant.stats.damageSelfMitigated) /
      Math.max(participant.stats.deaths, 1);

    return damageTankedPerDeath / 40000;
  },
};

export default thornmail;
