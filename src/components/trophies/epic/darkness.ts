import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const darkness: Trophy = {
  island: 'hub',
  name: 'darkness',
  level: 'hubEpic',
  title: 'Darkness',
  description: 'Destroy at least twelve enemy wards.',
  category: 'epic',
  maxProgress: 12,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'darkness');
    return participant.stats.wardsKilled / 12 + trophyProgress;
  },
};

export default darkness;
