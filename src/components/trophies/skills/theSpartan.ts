import { Trophy } from '../types';
import { getLaneOpponent } from '../../../api/riot/helpers';

const theSpartan: Trophy = {
  island: 'skills',
  name: 'theSpartan',
  level: 'skills4',
  title: 'The Spartan',
  description:
    'Have a 1200 xp lead over the opposing solo laner at 10 minutes (approximatley 1.5 level difference).',
  category: 'skills',
  checkProgress: ({ match, participant }) => {
    if (participant.role !== 'SOLO') {
      return 0;
    }
    const xpAt10 = participant.xpPerMinDeltas['0-10'] * 10;
    const laneOpponent = getLaneOpponent(match.info.participants, participant);

    if (!laneOpponent) {
      return 0;
    }

    const xpAt10OtherLaner = laneOpponent.timeline.xpPerMinDeltas['0-10'] * 10;
    return Number(xpAt10OtherLaner + 1200 <= xpAt10);
  },
};

export default theSpartan;
