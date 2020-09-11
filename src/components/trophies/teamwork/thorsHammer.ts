import { Trophy } from '../types';
import { calcTotalGoldFrames } from '../../../api/riot/helpers';
import { zip } from '../../../api/utils/arrays';

const thorsHammer: Trophy = {
  island: 'teamworkIsland',
  name: 'thorsHammer',
  level: 'teamwork8',
  title: 'Thors Hammer',
  description:
    'Gain 5000+ more gold than the enemy team in one minute (checked at full minutes).',
  category: 'teamwork',
  checkProgress: ({ match, participant, timeline }) => {
    const team = match.teams.find((team) => team.teamId === participant.teamId);
    const opponent = match.teams.find(
      (team) => team.teamId !== participant.teamId
    );

    const teamGoldFrames = calcTotalGoldFrames(timeline, team.teamId);
    const opponentGoldFrames = calcTotalGoldFrames(timeline, opponent.teamId);
    const teamGoldDiffFrames = zip(teamGoldFrames, opponentGoldFrames).map(
      (frame) => frame[0] - frame[1]
    );
    const teamGoldChangeFrames = zip(
      teamGoldDiffFrames.slice(0, teamGoldDiffFrames.length - 1),
      teamGoldDiffFrames.slice(1)
    ).map((frame) => frame[1] - frame[0]);
    const maxGoldSwing = Math.max(...teamGoldChangeFrames);

    return maxGoldSwing / 5000;
  },
};

export default thorsHammer;
