import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const theWhale: Trophy = {
  island: 'epic',
  name: 'theWhale',
  level: 'epic2',
  title: 'The Whale',
  description: 'Kill most minions three times in a row.',
  category: 'epic',
  maxProgress: 3,
  checkProgress: ({ match, account, participant }) => {
    const mostCS = Math.max(
      ...match.info.participants.map(
        (participant) =>
          participant.totalMinionsKilled + participant.neutralMinionsKilled
      )
    );

    const hasMostCS =
      participant.totalMinionsKilled + participant.neutralMinionsKilled >=
      mostCS;
    if (!hasMostCS) {
      return 0;
    }

    const trophyProgress = getTrophyProgress(account, 'theWhale');
    return 1 / 3 + trophyProgress;
  },
};

export default theWhale;
