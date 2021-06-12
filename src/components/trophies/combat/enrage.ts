import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const enrage: Trophy = {
  island: 'hub',
  name: 'enrage',
  level: 'hubCombat',
  title: 'Enrage',
  description: 'Score at least three killing sprees.',
  category: 'combat',
  maxProgress: 3,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'enrage');

    return participant.killingSprees / 3 + trophyProgress;
  },
  checkLive: ({ events, trophyData, account }) => {
    if (trophyData.enrage || events.length === 0) {
      return 0;
    }

    const multiKills = events.filter(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 3
    );
    const trophyProgress = getTrophyProgress(account, 'enrage');

    const progress = Math.min(1, multiKills.length / 3 + trophyProgress);
    if (progress === 1) {
      trophyData.enrage = true;
    }
    return progress;
  },
};

export default enrage;
