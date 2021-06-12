import { Trophy } from '../types';

const preserver: Trophy = {
  island: 'teamwork',
  name: 'preserver',
  level: 'teamwork8',
  title: 'Preserver',
  description:
    'Heal more damage than any opposing player dealt damage to champions.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
    const opponentTeam = match.info.participants.filter(
      (other) => other.teamId !== participant.teamId
    );

    const maxTotalDamageDealtToChampions = Math.max(
      ...opponentTeam.map((participant) => participant.totalHeal)
    );

    return Number(participant.totalHeal >= maxTotalDamageDealtToChampions);
  },
};

export default preserver;
