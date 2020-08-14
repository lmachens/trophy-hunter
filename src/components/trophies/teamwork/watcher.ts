import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const watcher: Trophy = {
  island: 'teamworkIsland',
  name: 'watcher',
  level: 'teamwork5',
  title: 'Watcher',
  description: 'Place at least 15 wards.',
  category: 'teamwork',
  maxProgress: 15,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    const trophyProgress = getTrophyProgress(account, 'watcher');
    return participant.stats.wardsPlaced / 15 + trophyProgress;
  },
};

export default watcher;
