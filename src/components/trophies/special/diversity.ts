import { Trophy } from '../types';
import {
  getTrophyProgress,
  getTrophyProgressDetails,
} from '../../../api/accounts/helpers';
import LastChampions from './LastChampions';

const diversity: Trophy = {
  island: 'hub',
  name: 'diversity',
  level: 'hubSpecial',
  title: 'Diversity',
  description: 'Play three different champions.',
  category: 'special',
  maxProgress: 3,
  ProgressDetails: LastChampions,
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
