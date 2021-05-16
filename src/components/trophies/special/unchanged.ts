import { Trophy } from '../types';
import { getTrophyProgressDetails } from '../../../api/accounts/helpers';
import LastChampions from './LastChampions';

const unchanged: Trophy = {
  island: 'special',
  name: 'unchanged',
  level: 'special1',
  title: 'Unchanged',
  description: 'Play the same champion three times in a row.',
  category: 'special',
  maxProgress: 3,
  ProgressDetails: LastChampions,
  aramSupport: true,
  checkProgress: ({ account, participant }) => {
    const trophyProgressDetails = getTrophyProgressDetails(
      account,
      'unchanged'
    );
    const playedSameChampion = [
      ...trophyProgressDetails.filter(
        (championId) => championId === participant.championId
      ),
      participant.championId,
    ];

    return {
      progress: playedSameChampion.length / 3,
      details: trophyProgressDetails,
    };
  },
};

export default unchanged;
