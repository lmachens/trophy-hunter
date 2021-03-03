import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const theFinalHour: Trophy = {
  island: 'combat',
  name: 'theFinalHour',
  level: 'combat5',
  title: 'The Final Hour',
  description: `Get at least ten kills in the last ten minutes of the game.\nARAM: 14 kills`,
  category: 'combat',
  aramSupport: true,
  checkProgress: ({ match, events, participant }) => {
    const killsAtEndgame = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp >= match.gameDuration * 1000 - 600000
    ).length;

    const requiredKills = match.queueId === ARAM_HOWLING_ABYSS ? 14 : 10;
    return killsAtEndgame / requiredKills;
  },
};

export default theFinalHour;
