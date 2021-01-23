import { Trophy } from '../types';
import { calcTotalGoldFrames } from '../../../api/riot/helpers';
import { zip } from '../../../api/utils/arrays';

const chaliceOfRecovery: Trophy = {
  island: 'teamwork',
  name: 'chaliceOfRecovery',
  level: 'teamwork2',
  title: 'Chalice Of Recovery',
  description: 'Win a match where your team was 4000 gold behind.',
  category: 'teamwork',
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
    return Number(teamMaxGoldDown <= -4000 && team.win === 'Win');
  },
};

export default chaliceOfRecovery;
