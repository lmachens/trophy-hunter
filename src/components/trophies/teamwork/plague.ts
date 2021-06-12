import { Trophy } from '../types';

const plague: Trophy = {
  island: 'teamwork',
  name: 'plague',
  level: 'teamwork6',
  title: 'Plague',
  description: 'Have highest kill participation and highest total heal.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
    const maxKillParticipation = Math.max(
      ...match.info.participants.map(
        (participant) => participant.kills + participant.assists
      )
    );
    const maxTotalHeal = Math.max(
      ...match.info.participants.map((participant) => participant.totalHeal)
    );

    return Number(
      participant.kills + participant.assists >= maxKillParticipation &&
        participant.totalHeal >= maxTotalHeal
    );
  },
};

export default plague;
