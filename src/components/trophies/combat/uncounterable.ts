import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const uncounterable: Trophy = {
  island: 'combatIsland',
  name: 'uncounterable',
  level: 'combat3',
  title: 'Uncounterable',
  description: 'Deal more than 5000 true damage to champions.',
  category: 'combat',
  maxProgress: 5000,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return participant.stats.trueDamageDealtToChampions / 5000;
  },
};

export default uncounterable;
