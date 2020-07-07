import { Trophy } from '../types';
import {
  getParticipantByAccount,
  getLaneOpponent,
} from '../../../api/riot/helpers';

const dominus: Trophy = {
  island: 'combatIsland',
  name: 'dominus',
  level: 'combat7',
  title: 'Dominus',
  description:
    'Achieve a 10 cs advantage over your opponent, 3 kills (at least one of them is a solo kill) at 10 minutes into the game.',
  category: 'combat',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    if (!participant.timeline || !participant.timeline.creepsPerMinDeltas) {
      return 0;
    }
    const laneOpponent = getLaneOpponent(match.participants, participant);

    const csLaneDiffAt10 =
      participant.timeline.creepsPerMinDeltas['0-10'] * 10 -
      laneOpponent.timeline.creepsPerMinDeltas['0-10'] * 10;

    const soloKillsPre10 = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.assistingParticipantIds.length === 0 &&
        event.timestamp <= 600000
    ).length;

    const killsPre10 = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp <= 600000
    ).length;

    return (
      (Number(csLaneDiffAt10 > 10) +
        Number(soloKillsPre10 > 1) +
        Number(killsPre10 > 3)) /
      3
    );
  },
};

export default dominus;
