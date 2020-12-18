import { Trophy } from '../types';

const deadlyShadow: Trophy = {
  island: 'combat',
  name: 'deadlyShadow',
  level: 'combat6',
  title: 'Deadly Shadow',
  description: 'Have most kills while taking least damage in the game.',
  category: 'combat',
  checkProgress: ({ match, participant }) => {
    const maxKills = Math.max(
      ...match.participants.map((participant) => participant.stats.kills)
    );
    const minTotalDamageTaken = Math.min(
      ...match.participants.map(
        (participant) => participant.stats.totalDamageTaken
      )
    );

    return Number(
      participant.stats.kills >= maxKills &&
        participant.stats.totalDamageTaken === minTotalDamageTaken
    );
  },
};

export default deadlyShadow;
