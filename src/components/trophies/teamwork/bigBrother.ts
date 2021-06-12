import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const bigBrother: Trophy = {
  island: 'teamwork',
  name: 'bigBrother',
  level: 'teamwork6',
  title: 'Big Brother',
  description: 'Have the highest vision score three matches in a row.',
  category: 'teamwork',
  maxProgress: 3,
  checkProgress: ({ match, account, participant }) => {
    const maxVisionScore = Math.max(
      ...match.info.participants.map((other) => other.visionScore)
    );
    const hasHighestVisionScore = participant.visionScore >= maxVisionScore;

    const trophyProgress = getTrophyProgress(account, 'bigBrother');
    return Number(hasHighestVisionScore) / 3 + trophyProgress;
  },
};

export default bigBrother;
