import { Trophy } from '../types';
import { getLaneOpponent, getMinionsAtMin } from '../../../api/riot/helpers';

const dominus: Trophy = {
  island: 'combat',
  name: 'dominus',
  level: 'combat7',
  title: 'Dominus',
  description:
    'Achieve a 10 cs advantage over your opponent, 3 kills (at least one of them is a solo kill) at 10 minutes into the game.',
  category: 'combat',
  checkProgress: ({ match, events, participant, timeline }) => {
    const laneOpponent = getLaneOpponent(match.participants, participant);
    if (!laneOpponent) {
      return 0;
    }

    const participantMinions = getMinionsAtMin(
      timeline,
      10,
      participant.participantId
    );
    const laneOpponentMinions = getMinionsAtMin(
      timeline,
      10,
      laneOpponent.participantId
    );

    const csLaneDiffAt10 = participantMinions - laneOpponentMinions;

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
