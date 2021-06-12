import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const lightBringer: Trophy = {
  island: 'teamwork',
  name: 'lightBringer',
  level: 'teamwork3',
  title: 'Light Bringer',
  description: 'Place at least 25 wards.',
  category: 'teamwork',
  maxProgress: 25,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'lightBringer');
    return participant.wardsPlaced / 25 + trophyProgress;
  },
};

export default lightBringer;
