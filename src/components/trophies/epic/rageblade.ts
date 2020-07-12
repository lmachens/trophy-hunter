import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const rageblade: Trophy = {
  island: 'epicIsland',
  name: 'rageblade',
  level: 'epic1',
  title: 'rageblade',
  description: 'Deal more than 75000 total damage to champions.',
  category: 'epic',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return Number(participant.stats.totalDamageDealtToChampions >= 75000);
  },
};

export default rageblade;
