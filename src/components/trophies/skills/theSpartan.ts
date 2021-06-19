import { Trophy } from '../types';
import {
  getLaneOpponent,
  getParticipantFrameAtMin,
} from '../../../api/riot/helpers';

const theSpartan: Trophy = {
  island: 'skills',
  name: 'theSpartan',
  level: 'skills4',
  title: 'The Spartan',
  description:
    'Have a 1200 xp lead over the opposing solo laner at 10 minutes (approximatley 1.5 level difference).',
  category: 'skills',
  checkProgress: ({ match, participant, timeline }) => {
    if (participant.role !== 'SOLO') {
      return 0;
    }
    const participantFrameAt10 = getParticipantFrameAtMin(
      timeline,
      participant.participantId,
      10
    );
    if (!participantFrameAt10) {
      return 0;
    }
    const xpAt10 = participantFrameAt10.xp;
    const laneOpponent = getLaneOpponent(match.info.participants, participant);

    if (!laneOpponent) {
      return 0;
    }

    const opponentFrameAt10 = getParticipantFrameAtMin(
      timeline,
      laneOpponent.participantId,
      10
    );

    const xpAt10OtherLaner = opponentFrameAt10.xp;
    return Number(xpAt10OtherLaner + 1200 <= xpAt10);
  },
};

export default theSpartan;
