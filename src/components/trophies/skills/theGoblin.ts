import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const theGoblin: Trophy = {
  island: 'skills',
  name: 'theGoblin',
  level: 'skills6',
  title: 'The Goblin',
  description: 'Have most jungle cs three times in a row.',
  category: 'skills',
  maxProgress: 3,
  checkProgress: ({ participant, account, timeline }) => {
    const lastFrames = timeline.info.frames[timeline.info.frames.length - 1];
    const lastParticipantFrames = Object.values(lastFrames.participantFrames);

    const maxJunglMinionsKilled = Math.max(
      ...lastParticipantFrames.map(
        (participantFrame) => participantFrame.jungleMinionsKilled
      )
    );
    const participantFrame =
      lastFrames.participantFrames[participant.participantId];
    const mostJungleMinionsKilled =
      participantFrame.jungleMinionsKilled >= maxJunglMinionsKilled;
    if (!mostJungleMinionsKilled) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'theGoblin');
    return Number(mostJungleMinionsKilled) / 3 + trophyProgress;
  },
};

export default theGoblin;
