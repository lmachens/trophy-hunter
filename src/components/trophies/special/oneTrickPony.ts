import { Trophy } from '../types';
import { getTrophyProgressDetails } from '../../../api/accounts/helpers';
import LastChampions from './LastChampions';

const oneTrickPony: Trophy = {
  island: 'special',
  name: 'oneTrickPony',
  level: 'special4',
  title: 'One Trick Pony',
  description:
    'Play the same champion in the last five matches and win all of them.',
  category: 'special',
  maxProgress: 5,
  ProgressDetails: LastChampions,
  aramSupport: true,
  checkProgress: ({ account, participant }) => {
    if (!participant.stats.win) {
      return {
        progress: 0,
        details: [],
      };
    }
    const trophyProgressDetails = getTrophyProgressDetails(
      account,
      'oneTrickPony'
    );
    const playedSameChampion = [
      ...trophyProgressDetails.filter(
        (championId) => championId === participant.championId
      ),
      participant.championId,
    ];
    return {
      progress: playedSameChampion.length / 5,
      details: playedSameChampion,
    };
  },
};

export default oneTrickPony;
