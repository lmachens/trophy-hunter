import { Trophy } from '../types';
import { getAllKills } from '../../../api/riot/helpers';

const curtainCall: Trophy = {
  island: 'combat',
  name: 'curtainCall',
  level: 'combat6',
  title: 'Curtain Call',
  description:
    'Take the last kill in a teamfight twice in a game (Teamfight: at least four kills in 15 seconds and 2500 units).',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    const kills = getAllKills(events);
    const teamFightRange = 2500;
    const teamFightTimeRange = 15000;
    const teamfightLastKills = kills.filter((kill, index) => {
      if (index < 3 || kill.killerId !== participant.participantId) {
        return false;
      }
      const kill1 = kills[index - 3];
      const kill2 = kills[index - 2];
      const kill3 = kills[index - 1];
      const killAfter =
        index >= kills.length - 2 ? undefined : kills[index + 1];
      const kill1InRange =
        Math.sqrt(
          (kill1.position.x - kill2.position.x) *
            (kill1.position.x - kill2.position.x) +
            (kill1.position.y - kill2.position.y) *
              (kill1.position.y - kill2.position.y)
        ) < teamFightRange;
      const kill1CloseInTime =
        kill2.timestamp - kill1.timestamp < teamFightTimeRange;
      const kill2InRange =
        Math.sqrt(
          (kill2.position.x - kill3.position.x) *
            (kill2.position.x - kill3.position.x) +
            (kill2.position.y - kill3.position.y) *
              (kill2.position.y - kill3.position.y)
        ) < teamFightRange;
      const kill2CloseInTime =
        kill3.timestamp - kill2.timestamp < teamFightTimeRange;
      const kill3InRange =
        Math.sqrt(
          (kill3.position.x - kill.position.x) *
            (kill3.position.x - kill.position.x) +
            (kill3.position.y - kill.position.y) *
              (kill3.position.y - kill.position.y)
        ) < teamFightRange;
      const kill3CloseInTime =
        kill.timestamp - kill3.timestamp < teamFightTimeRange;
      let noAfterKill = true;
      if (index < kills.length - 2) {
        const killAfterInRange =
          Math.sqrt(
            (killAfter.position.x - kill.position.x) *
              (killAfter.position.x - kill.position.x) +
              (killAfter.position.y - kill.position.y) *
                (killAfter.position.y - kill.position.y)
          ) < teamFightRange;
        const killAfterCloseInTime =
          killAfter.timestamp - kill.timestamp < teamFightTimeRange;
        noAfterKill = !(killAfterInRange && killAfterCloseInTime);
      }
      return (
        kill1InRange &&
        kill1CloseInTime &&
        kill2InRange &&
        kill2CloseInTime &&
        kill3InRange &&
        kill3CloseInTime &&
        noAfterKill
      );
    }).length;

    return teamfightLastKills / 2;
  },
};

export default curtainCall;
