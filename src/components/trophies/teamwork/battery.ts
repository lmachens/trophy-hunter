import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const battery: Trophy = {
  island: 'teamworkIsland',
  name: 'battery',
  level: 'teamwork2',
  title: 'battery',
  description:
    'Heal/Regenerate 20% more damage and take 20% more damage than the next player.',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
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
