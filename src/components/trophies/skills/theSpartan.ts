import { Trophy } from '../types';
import {
  getParticipantByAccount,
  getLaneOpponent,
} from '../../../api/riot/helpers';

const theSpartan: Trophy = {
  island: 'skillsIsland',
  name: 'theSpartan',
  level: 'skills4',
  title: 'The Spartan',
  description:
    'Have a 1200 xp lead over the opposing solo laner at 10 minutes (approximatley 1.5 level difference).',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    if (participant.timeline.role !== 'SOLO') {
      return 0;
    }
    const xpAt10 = participant.timeline.xpPerMinDeltas['0-10'] * 10;
    const laneOpponent = getLaneOpponent(match.participants, participant);

    if (!laneOpponent) {
      return 0;
    }

    const xpAt10OtherLaner = laneOpponent.timeline.xpPerMinDeltas['0-10'] * 10;
    return Number(xpAt10OtherLaner + 1200 <= xpAt10);
  },
};

export default theSpartan;
