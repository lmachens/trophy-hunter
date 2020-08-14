import { Trophy } from '../types';
import {
  getParticipantByAccount,
  getParticipantAssists,
  getTeammates,
} from '../../../api/riot/helpers';
import { zip } from '../../../api/utils/arrays';

const unbreakableWill: Trophy = {
  island: 'teamworkIsland',
  name: 'unbreakableWill',
  level: 'teamwork5',
  title: 'Unbreakable Will',
  description:
    'Have highest self-mitigated damage and most assists of your team as a support.',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

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
