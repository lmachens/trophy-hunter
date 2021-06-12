import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const darkness: Trophy = {
  island: 'hub',
  name: 'darkness',
  level: 'hubEpic',
  title: 'Darkness',
  description: 'Destroy at least fifteen enemy wards.',
  category: 'epic',
  maxProgress: 15,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'darkness');
    return participant.wardsKilled / 15 + trophyProgress;
  },
};

export default darkness;
