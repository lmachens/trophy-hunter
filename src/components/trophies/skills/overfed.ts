import { Trophy } from '../types';
import { getOtherParticipants } from '../../../api/riot/helpers';

const overfed: Trophy = {
  island: 'skills',
  name: 'overfed',
  level: 'skills4',
  title: 'Overfed',
  description: 'You spent more than 1.25 times more gold than the next person.',
  category: 'skills',
  checkProgress: ({ match, participant }) => {
    const maxGoldSpentOthers = Math.max(
      ...getOtherParticipants(match, participant).map(
        (other) => other.stats.goldSpent
      )
    );
    return Number(participant.stats.goldSpent >= 1.25 * maxGoldSpentOthers);
  },
};

export default overfed;
