import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const theFinalHour: Trophy = {
  island: 'combatIsland',
  name: 'theFinalHour',
  level: 'combat5',
  title: 'The Final Hour',
  description: 'Get at least ten kills in the last ten minutes of the game.',
  category: 'combat',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    const killsAtEndgame = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp >= match.gameDuration * 1000 - 600000
    ).length;

    return killsAtEndgame / 10;
  },
};

export default theFinalHour;