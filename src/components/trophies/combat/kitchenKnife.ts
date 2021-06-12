import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const kitchenKnife: Trophy = {
  island: 'hub',
  name: 'kitchenKnife',
  level: 'hubCombat',
  title: 'Kitchen Knife',
  description: `Deal more than 30000 total damage to champions.\nARAM: 35000 damage`,
  category: 'combat',
  aramSupport: true,
  checkProgress: ({ participant, match }) => {
    const requiredDamage =
      match.info.queueId === ARAM_HOWLING_ABYSS ? 35000 : 30000;
    return participant.totalDamageDealtToChampions / requiredDamage;
  },
};

export default kitchenKnife;
