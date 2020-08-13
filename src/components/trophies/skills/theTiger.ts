import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const theTiger: Trophy = {
  island: 'skillsIsland',
  name: 'theTiger',
  level: 'skills6',
  title: 'The Tiger',
  description: 'Have most kills three times in a row.',
  category: 'skills',
  maxProgress: 3,

  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const maxKills = Math.max(
      ...match.participants.map((participant) => participant.stats.kills)
    );
    const mostKills = participant.stats.kills >= maxKills;
    if (!mostKills) {
      return 0;
    }

    const trophyProgress = getTrophyProgress(account, 'theTiger');
    return Number(mostKills) / 3 + trophyProgress;
  },
};

export default theTiger;
