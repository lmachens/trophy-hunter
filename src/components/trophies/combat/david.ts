import { Trophy } from '../types';
import { getParticipantIdentity } from '../../../api/riot/helpers';

const david: Trophy = {
  island: 'combatIsland',
  name: 'david',
  level: 'combat2',
  title: 'David',
  description: 'Kill an opponent who is at least two levels above you.',
  category: 'combat',
  checkProgress: ({ match, timeline, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const davidKill = timeline.frames.find((frame) => {
      const participantFrames = Object.values(frame.participantFrames);
      const player = participantFrames.find(
        (participantFrame) =>
          participantFrame.participantId === participantIdentity.participantId
      );

      return frame.events.find((event) => {
        if (
          event.type !== 'CHAMPION_KILL' ||
          event.killerId !== player.participantId
        ) {
          return false;
        }
        const victim = participantFrames.find(
          (participantFrame) =>
            participantFrame.participantId === event.victimId
        );
        return victim.level >= player.level + 2;
      });
    });
    return Number(davidKill);
  },
};

export default david;
