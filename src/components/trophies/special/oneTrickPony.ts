import { Trophy } from '../types';
import {
  getTrophyProgress,
  getTrophyProgressDetails,
} from '../../../api/accounts/helpers';
import OneTrickPonyDetails from './OneTrickPonyDetails';

const oneTrickPony: Trophy = {
  island: 'special',
  name: 'oneTrickPony',
  level: 'special4',
  title: 'One Trick Pony',
  description:
    'Play the same champion in the last five matches and win all of them.',
  category: 'special',
  maxProgress: 5,
  ProgressDetails: OneTrickPonyDetails,
  checkProgress: ({ account, participant }) => {
    if (!participant.stats.win) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'oneTrickPony');
    const trophyProgressDetails = getTrophyProgressDetails(
      account,
      'oneTrickPony'
    );
    const playedSameChampion = trophyProgressDetails.every(
      (championId) => championId === participant.championId
    );
    if (!playedSameChampion) {
      return 0;
    }
    trophyProgressDetails.push(participant.championId);
    return {
      progress: 1 / 5 + trophyProgress,
      details: trophyProgressDetails,
    };
  },
};

export default oneTrickPony;
