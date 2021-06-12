import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const theCat: Trophy = {
  island: 'epic',
  name: 'theCat',
  level: 'epic2',
  title: 'The Cat',
  description: 'Have least number of deaths three times in a row.',
  category: 'epic',
  maxProgress: 3,
  checkProgress: ({ match, account, participant }) => {
    const minDeaths = Math.min(
      ...match.info.participants.map((participant) => participant.deaths)
    );

    const hasMinDeaths = Number(participant.deaths <= minDeaths);
    if (!hasMinDeaths) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'theCat');
    return hasMinDeaths / 3 + trophyProgress;
  },
};

export default theCat;
