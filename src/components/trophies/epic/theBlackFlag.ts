import { Trophy } from '../types';
import { calcTotalGoldFrames } from '../../../api/riot/helpers';
import { zip } from '../../../api/utils/arrays';

const theBlackFlag: Trophy = {
  island: 'epic',
  name: 'theBlackFlag',
  level: 'epic2',
  title: 'The Black Flag',
  description:
    'Never resign! Come back in a game where you have been 10000 gold down.',
  category: 'epic',
  checkProgress: ({ match, timeline, participant }) => {
    const team = match.teams.find((team) => team.teamId === participant.teamId);
    const opponent = match.teams.find(
      (team) => team.teamId !== participant.teamId
    );

    const teamGoldFrames = calcTotalGoldFrames(timeline, team.teamId);
    const opponentGoldFrames = calcTotalGoldFrames(timeline, opponent.teamId);
    const teamGoldDiffFrames = zip(teamGoldFrames, opponentGoldFrames).map(
      (frame) => frame[0] - frame[1]
    );

    const teamMaxGoldDown = Math.min(...teamGoldDiffFrames);

    return Number(teamMaxGoldDown > 10000 && participant.stats.win);
  },
};

export default theBlackFlag;
