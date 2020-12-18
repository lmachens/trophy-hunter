import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const theBear: Trophy = {
  island: 'epic',
  name: 'theBear',
  level: 'epic1',
  title: 'The Bear',
  description: 'Have highest kill participation three times in a row.',
  category: 'epic',
  maxProgress: 3,
  checkProgress: ({ match, account, participant }) => {
    const maxKillParticipation = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.kills + participant.stats.assists
      )
    );

    const highestKillParticipation = Number(
      participant.stats.kills + participant.stats.assists >=
        maxKillParticipation
    );
    if (!highestKillParticipation) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'theBear');
    return highestKillParticipation / 3 + trophyProgress;
  },
};

export default theBear;
