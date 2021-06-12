import { Trophy } from '../types';
import { getLaneOpponent } from '../../../api/riot/helpers';

const flameHorizon: Trophy = {
  island: 'skills',
  name: 'flameHorizon',
  level: 'skills3',
  title: 'Flame Horizon',
  description: 'Kill at least 100 more minions than your lane opponent.',
  category: 'skills',
  checkProgress: ({ match, participant }) => {
    const laneOpponent = getLaneOpponent(match.info.participants, participant);
    if (!laneOpponent) {
      return 0;
    }
    return (
      (participant.totalMinionsKilled + participant.neutralMinionsKilled) /
      (laneOpponent.totalMinionsKilled +
        laneOpponent.neutralMinionsKilled +
        100)
    );
  },
};

export default flameHorizon;
