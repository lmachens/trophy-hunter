import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const enrage: Trophy = {
  island: 'hubIsland',
  name: 'enrage',
  level: 'hubCombat',
  title: 'Enrage',
  description: 'Score at least three killing sprees.',
  category: 'combat',
  maxProgress: 3,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const trophyProgress = getTrophyProgress(account, 'enrage');

    return (participant.stats.killingSprees + trophyProgress * 3) / 3;
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

    const progress = Math.min(1, (multiKills.length + trophyProgress * 3) / 3);
    if (progress === 1) {
      trophyData.enrage = true;
    }
    return progress;
  },
};

export default enrage;
