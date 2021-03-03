import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const rageblade: Trophy = {
  island: 'epic',
  name: 'rageblade',
  level: 'epic1',
  title: 'Rageblade',
  description: `Deal more than 75000 total damage to champions.\nARAM: 80000 total damage`,
  category: 'epic',
  aramSupport: true,
  checkProgress: ({ participant, match }) => {
    const requiredDamage = match.queueId === ARAM_HOWLING_ABYSS ? 80000 : 75000;
    return Number(
      participant.stats.totalDamageDealtToChampions >= requiredDamage
    );
  },
};

export default rageblade;
