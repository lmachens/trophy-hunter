import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const darkness: Trophy = {
  island: 'hubIsland',
  name: 'darkness',
  level: 'hubEpic',
  title: 'Darkness',
  description: 'Destroy at least twelve enemy wards.',
  category: 'epic',
  maxProgress: 12,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const trophyProgress = getTrophyProgress(account, 'darkness');
    return (participant.stats.wardsKilled + trophyProgress * 12) / 12;
  },
};

export default darkness;
