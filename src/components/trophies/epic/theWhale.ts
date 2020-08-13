import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const theWhale: Trophy = {
  island: 'epicIsland',
  name: 'theWhale',
  level: 'epic2',
  title: 'The Whale',
  description: 'Kill most minions three times in a row.',
  category: 'epic',
  maxProgress: 3,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const mostCS = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.totalMinionsKilled
      )
    );

    const hasMostCS = participant.stats.totalMinionsKilled >= mostCS;
    if (!hasMostCS) {
      return 0;
    }

    const trophyProgress = getTrophyProgress(account, 'theWhale');
    return 1 / 3 + trophyProgress;
  },
};

export default theWhale;
