import { Trophy } from '../types';
import {
  getParticipantByAccount,
  getLaneOpponent,
} from '../../../api/riot/helpers';

const flameHorizon: Trophy = {
  island: 'skillsIsland',
  name: 'flameHorizon',
  level: 'skills3',
  title: 'Flame Breath',
  description: 'Kill at least 100 more minions than your lane opponent.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const laneOpponent = getLaneOpponent(match.participants, participant);
    if (!laneOpponent) {
      return 0;
    }
    return (
      (participant.stats.totalMinionsKilled +
        participant.stats.neutralMinionsKilled) /
      (laneOpponent.stats.totalMinionsKilled +
        laneOpponent.stats.neutralMinionsKilled +
        100)
    );
  },
};

export default flameHorizon;
