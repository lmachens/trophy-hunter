import { Trophy } from '../types';

const myJungle: Trophy = {
  island: 'skills',
  name: 'myJungle',
  level: 'skills2',
  title: 'My Jungle',
  description: 'Have most jungle cs.',
  category: 'skills',
  checkProgress: ({ participant, timeline }) => {
    const lastFrames = timeline.info.frames[timeline.info.frames.length - 1];
    const lastParticipantFrames = Object.values(lastFrames.participantFrames);

    const maxJungleMinionsKilled = Math.max(
      ...lastParticipantFrames.map(
        (participantFrame) => participantFrame.jungleMinionsKilled
      )
    );
    const participantFrame =
      lastFrames.participantFrames[participant.participantId];

    const mostJungleMinionsKilled =
      participantFrame.jungleMinionsKilled >= maxJungleMinionsKilled;

    return Number(mostJungleMinionsKilled);
  },
};

export default myJungle;
