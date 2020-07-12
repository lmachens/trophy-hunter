import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const preserver: Trophy = {
  island: 'teamworkIsland',
  name: 'preserver',
  level: 'teamwork8',
  title: 'Preserver',
  description:
    'Heal more damage than any opposing player dealt damage to champions.',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const opponentTeam = match.participants.filter(
      (other) => other.teamId !== participant.teamId
    );

    const maxTotalDamageDealtToChampions = Math.max(
      ...opponentTeam.map((participant) => participant.stats.totalHeal)
    );

    return Number(
      participant.stats.totalHeal >= maxTotalDamageDealtToChampions
    );
  },
};

export default preserver;
