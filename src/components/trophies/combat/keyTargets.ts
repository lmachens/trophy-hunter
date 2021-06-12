import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { ChampionKillEvent } from '../../../api/riot/types';
import { Trophy } from '../types';

const keyTargets: Trophy = {
  island: 'combat',
  name: 'keyTargets',
  level: 'combat1',
  title: 'Key Targets',
  description: `Achieve three kills on the opponent with the highest amount of gold in the game at that point (gold checked at full minutes).\nARAM: Four kills`,
  category: 'combat',
  aramSupport: true,
  checkProgress: ({ match, timeline, participant }) => {
    const opponentIds = match.info.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId !== participant.teamId
      )
      .map((opponent) => opponent.participantId);

    const keyTargetKills = timeline.info.frames.reduce(
      (currentKeyTargetKills, frame) => {
        const participantKills = <ChampionKillEvent[]>(
          frame.events.filter(
            (event) =>
              event.type === 'CHAMPION_KILL' &&
              event.killerId === participant.participantId
          )
        );
        if (participantKills.length === 0) {
          return currentKeyTargetKills;
        }

        const richesOpponent = Object.values(frame.participantFrames)
          .filter((participantFrame) =>
            opponentIds.includes(participantFrame.participantId)
          )
          .sort((a, b) => b.totalGold - a.totalGold)[0];
        const richesParticipantKills = participantKills.filter(
          (kill) => kill.victimId === richesOpponent.participantId
        ).length;
        return currentKeyTargetKills + richesParticipantKills;
      },
      0
    );

    const requiredKills = match.info.queueId === ARAM_HOWLING_ABYSS ? 4 : 3;
    return keyTargetKills / requiredKills;
  },
};

export default keyTargets;
