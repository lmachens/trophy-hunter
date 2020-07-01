import { Trophy } from '../types';
import {
  getParticipantKills,
  getParticipantIdentity,
} from '../../../api/riot/helpers';

const shockwave: Trophy = {
  island: 'combatIsland',
  name: 'shockwave',
  level: 'combat4',
  title: 'Shockwave',
  description:
    'Kill two opponents at the same time (+- 1 second) and the same location (+-350units).',
  category: 'combat',
  checkProgress: ({ match, events, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);
    const kills = getParticipantKills(
      events,
      participantIdentity.participantId
    );

    const shockwaveKills = kills.filter((kill, index) => {
      if (index === 0) {
        return false;
      }
      const previousKill = kills[index - 1];
      const in1SecFromEachOther =
        kill.timestamp - previousKill.timestamp <= 1000;
      const sufficientClose =
        Math.sqrt(
          (kill.position.x - previousKill.position.x) *
            (kill.position.x - previousKill.position.x) +
            (kill.position.y - previousKill.position.y) *
              (kill.position.y - previousKill.position.y)
        ) <= 350;
      return in1SecFromEachOther && sufficientClose;
    }).length;
    return shockwaveKills;
  },
};

export default shockwave;
