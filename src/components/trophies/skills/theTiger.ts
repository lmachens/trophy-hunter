import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const theTiger: Trophy = {
  island: 'skills',
  name: 'theTiger',
  level: 'skills6',
  title: 'The Tiger',
  description: 'Have most kills three times in a row.',
  category: 'skills',
  maxProgress: 3,
  checkProgress: ({ match, account, participant }) => {
    const maxKills = Math.max(
      ...match.info.participants.map((participant) => participant.kills)
    );
    const mostKills = participant.kills >= maxKills;
    if (!mostKills) {
      return 0;
    }

    const trophyProgress = getTrophyProgress(account, 'theTiger');
    return Number(mostKills) / 3 + trophyProgress;
  },
};

export default theTiger;
