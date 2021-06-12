import { Trophy } from '../types';
import { calcTotalGoldFrames } from '../../../api/riot/helpers';
import { zip } from '../../../api/utils/arrays';

const rivalry: Trophy = {
  island: 'skills',
  name: 'rivalry',
  level: 'skills2',
  title: 'Rivalry',
  description:
    'Win a game where the gold difference in the first 15 minutes was always less than 2000.',
  category: 'skills',
  checkProgress: ({ match, timeline, participant }) => {
    const team = match.info.teams.find(
      (team) => team.teamId === participant.teamId
    );
    const opponent = match.info.teams.find(
      (team) => team.teamId !== participant.teamId
    );

    const teamGoldFrames = calcTotalGoldFrames(timeline, team.teamId);
    const opponentGoldFrames = calcTotalGoldFrames(timeline, opponent.teamId);

    const teamGoldDiffFrames = zip(teamGoldFrames, opponentGoldFrames).map(
      (frame) => frame[0] - frame[1]
    );

    const isRivalry = teamGoldDiffFrames
      .slice(0, 15)
      .every((diff) => Math.abs(diff) < 2000);

    return Number(isRivalry && participant.win);
  },
};

export default rivalry;
