import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const watcher: Trophy = {
  island: 'teamwork',
  name: 'watcher',
  level: 'teamwork5',
  title: 'Watcher',
  description: 'Place at least 15 wards.',
  category: 'teamwork',
  maxProgress: 15,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'watcher');
    return participant.stats.wardsPlaced / 15 + trophyProgress;
  },
};

export default watcher;
