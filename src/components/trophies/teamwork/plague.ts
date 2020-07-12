import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const plague: Trophy = {
  island: 'teamworkIsland',
  name: 'plague',
  level: 'teamwork6',
  title: 'Plague',
  description: 'Have highest kill participation and highest total heal.',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const maxKillParticipation = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.kills + participant.stats.assists
      )
    );
    const maxTotalHeal = Math.max(
      ...match.participants.map((participant) => participant.stats.totalHeal)
    );

    return Number(
      participant.stats.kills + participant.stats.assists >=
        maxKillParticipation && participant.stats.totalHeal >= maxTotalHeal
    );
  },
};

export default plague;