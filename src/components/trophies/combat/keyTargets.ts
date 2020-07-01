import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const keyTargets: Trophy = {
  island: 'combatIsland',
  name: 'keyTargets',
  level: 'combat1',
  title: 'Key Targets',
  description:
    'Achieve three kills on the opponent with the highest amount of gold in the game at that point (gold checked at full minutes).',
  category: 'combat',
  checkProgress: ({ match, timeline, account }) => {
    const participant = getParticipantByAccount(match, account);

    const keyTargetKills = timeline.frames.reduce(
      (currentKeyTargetKills, frame) => {
        const participantKills = frame.events.filter(
          (event) =>
            event.type === 'CHAMPION_KILL' &&
            event.killerId === participant.participantId
        );
        if (participantKills.length === 0) {
          return currentKeyTargetKills;
        }

        const richesPartcicipant = Object.values(
          frame.participantFrames
        ).reduce((currentRichesPartcicipant, participantFrame) => {
          if (
            currentRichesPartcicipant.totalGold > participantFrame.totalGold
          ) {
            return currentRichesPartcicipant;
          }
          return participantFrame;
        });
        const richesParticipantKills = participantKills.filter(
          (kill) => kill.victimId === richesPartcicipant.participantId
        ).length;
        return currentKeyTargetKills + richesParticipantKills;
      },
      0
    );

    return keyTargetKills / 3;
  },
};

export default keyTargets;
