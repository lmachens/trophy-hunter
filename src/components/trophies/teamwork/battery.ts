import { Trophy } from '../types';

const battery: Trophy = {
  island: 'teamwork',
  name: 'battery',
  level: 'teamwork2',
  title: 'Battery',
  description: 'Heal/Regenerate most damage and take most damage.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
    const maxTotalHeal = Math.max(
      ...match.participants.map((other) => other.stats.totalHeal)
    );
    const maxTotalDamageTaken = Math.max(
      ...match.participants.map((other) => other.stats.totalDamageTaken)
    );

    return Number(
      participant.stats.totalHeal >= maxTotalHeal &&
        participant.stats.totalDamageTaken >= maxTotalDamageTaken
    );
  },
};

export default battery;
