import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const machete: Trophy = {
  island: 'combatIsland',
  name: 'machete',
  level: 'combat5',
  title: 'Machete',
  description: 'Deal more than 50000 total damage to champions.',
  category: 'combat',
  maxProgress: 50000,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const trophyProgress = getTrophyProgress(account, 'machete');
    return (
      participant.stats.totalDamageDealtToChampions / 50000 + trophyProgress
    );
  },
};

export default machete;
