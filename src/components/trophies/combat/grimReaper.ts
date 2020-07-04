import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const grimReaper: Trophy = {
  island: 'combatIsland',
  name: 'grimReaper',
  level: 'combat6',
  title: 'Grim Reaper',
  description:
    "You're gonna get them in the end. Score three kills in the last minute of the game.",
  category: 'combat',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    const killsAtEndgame = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp >= match.gameDuration * 1000 - 60000
    ).length;

    return killsAtEndgame / 3;
  },
};

export default grimReaper;
