import { Trophy } from '../types';
import { getTeammates } from '../../../api/riot/helpers';

const unbreakableWill: Trophy = {
  island: 'teamwork',
  name: 'unbreakableWill',
  level: 'teamwork5',
  title: 'Unbreakable Will',
  description:
    'Have highest self-mitigated damage and most assists of your team as a support.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
    if (participant.role !== 'DUO_SUPPORT') {
      return 0;
    }

    const team = getTeammates(match, participant);
    const maxAssists = Math.max(
      ...team.map((participant) => participant.assists)
    );
    const maxDamageSelfMitigated = Math.max(
      ...team.map((participant) => participant.damageSelfMitigated)
    );

    return Number(
      participant.assists >= maxAssists &&
        participant.damageSelfMitigated >= maxDamageSelfMitigated
    );
  },
};

export default unbreakableWill;
