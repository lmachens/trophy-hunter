import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const lightBringer: Trophy = {
  island: 'teamworkIsland',
  name: 'lightBringer',
  level: 'teamwork3',
  title: 'Light Bringer',
  description: 'Place at least 25 wards.',
  category: 'teamwork',
  maxProgress: 25,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    const trophyProgress = getTrophyProgress(account, 'lightBringer');
    return participant.stats.wardsPlaced / 25 + trophyProgress;
  },
};

export default lightBringer;
