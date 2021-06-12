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
      ...match.info.participants.map((other) => other.totalHeal)
    );
    const maxTotalDamageTaken = Math.max(
      ...match.info.participants.map((other) => other.totalDamageTaken)
    );

    return Number(
      participant.totalHeal >= maxTotalHeal &&
        participant.totalDamageTaken >= maxTotalDamageTaken
    );
  },
};

export default battery;
