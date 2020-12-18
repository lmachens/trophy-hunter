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
    if (participant.timeline.role !== 'DUO_SUPPORT') {
      return 0;
    }

    const team = getTeammates(match, participant);
    const maxAssists = Math.max(
      ...team.map((participant) => participant.stats.assists)
    );
    const maxDamageSelfMitigated = Math.max(
      ...team.map((participant) => participant.stats.damageSelfMitigated)
    );

    return Number(
      participant.stats.assists >= maxAssists &&
        participant.stats.damageSelfMitigated >= maxDamageSelfMitigated
    );
  },
};

export default unbreakableWill;
