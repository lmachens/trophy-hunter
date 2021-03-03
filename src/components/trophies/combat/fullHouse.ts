import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const fullHouse: Trophy = {
  island: 'combat',
  name: 'fullHouse',
  level: 'combat4',
  title: 'Full House',
  description: `Achieve a doublekill and a triplekill.\nARAM: Three doublekills and a triplekill`,
  category: 'combat',
  aramSupport: true,
  checkProgress: ({ participant, match }) => {
    let progress = Math.min(1, participant.stats.tripleKills);
    if (match.queueId === ARAM_HOWLING_ABYSS) {
      progress += Math.min(1, participant.stats.doubleKills / 3);
    } else {
      progress += Math.min(1, participant.stats.doubleKills);
    }
    return progress / 2;
  },
  checkLive: ({ events, account, gameData }) => {
    const doubleKills = events.filter(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 2
    );
    const tripleKills = events.filter(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 3
    );
    let progress = Math.min(1, tripleKills.length);
    if (gameData.gameMode === 'ARAM') {
      progress += Math.min(1, doubleKills.length / 3);
    } else {
      progress += Math.min(1, doubleKills.length);
    }
    return progress / 2;
  },
};

export default fullHouse;
