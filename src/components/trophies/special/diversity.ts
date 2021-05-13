import { Trophy } from '../types';
import {
  getTrophyProgress,
  getTrophyProgressDetails,
} from '../../../api/accounts/helpers';
import DiversityDetails from './DiversityDetails';

const diversity: Trophy = {
  island: 'hub',
  name: 'diversity',
  level: 'hubSpecial',
  title: 'Diversity',
  description: 'Play three different champions.',
  category: 'special',
  maxProgress: 3,
  ProgressDetails: DiversityDetails,
  aramSupport: true,
  checkProgress: ({ account, participant }) => {
    const trophyProgress = getTrophyProgress(account, 'diversity');
    const trophyProgressDetails = getTrophyProgressDetails(
      account,
      'diversity'
    );
    let newProgress = trophyProgress;
    if (!trophyProgressDetails.includes(participant.championId)) {
      trophyProgressDetails.push(participant.championId);
      newProgress += 1 / 3;
    }
    return {
      progress: newProgress,
      details: trophyProgressDetails,
    };
  },
};

export default diversity;
