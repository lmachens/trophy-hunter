import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const kitchenKnife: Trophy = {
  island: 'hubIsland',
  name: 'kitchenKnife',
  level: 'hubCombat',
  title: 'Kitchen Knife',
  description: 'Deal more than 30000 total damage to champions.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return Number(participant.stats.totalDamageDealtToChampions >= 30000);
  },
};

export default kitchenKnife;
