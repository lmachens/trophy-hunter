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
      ...match.info.participants.map((participant) => participant.kills)
    );
    const minTotalDamageTaken = Math.min(
      ...match.info.participants.map(
        (participant) => participant.totalDamageTaken
      )
    );

    return Number(
      participant.kills >= maxKills &&
        participant.totalDamageTaken === minTotalDamageTaken
    );
  },
};

export default deadlyShadow;
