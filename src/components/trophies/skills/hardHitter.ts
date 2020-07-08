import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const hardHitter: Trophy = {
  island: 'skillsIsland',
  name: 'hardHitter',
  level: 'skills3',
  title: 'Hard Hitter',
  description: 'Deal more than 150k total damage.',
  category: 'skills',
  maxProgress: 150000,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const trophyProgress = getTrophyProgress(account, 'hardHitter');
    return participant.stats.totalDamageDealt / 150000 + trophyProgress;
  },
};

export default hardHitter;
