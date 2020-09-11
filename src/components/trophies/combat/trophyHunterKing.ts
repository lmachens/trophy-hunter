import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const trophyHunterKing: Trophy = {
  island: 'combatIsland',
  name: 'trophyHunterKing',
  level: 'combat7',
  title: 'Trophy Hunter King',
  description:
    'Achieve a Trophy Hunt (kill each opponent at least once) three times in a row.',
  category: 'combat',
  maxProgress: 3,
  checkProgress: ({ events, participant, account }) => {
    const victimIds = events
      .filter(
        (event) =>
          event.type === 'CHAMPION_KILL' &&
          event.killerId === participant.participantId
      )
      .map((event) => event.victimId);
    const uniqueVictimIds = victimIds.filter(
      (victimId, index, current) => current.indexOf(victimId) === index
    );
    const trophyHunt = uniqueVictimIds.length >= 5;
    if (!trophyHunt) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'trophyHunterKing');
    return Number(trophyHunt) / 3 + trophyProgress;
  },
  checkLive: ({ events, trophyData, account }) => {
    if (!events.length) {
      return 0;
    }

    const championKills = events.reduce((current, event) => {
      if (
        event.EventName !== 'ChampionKill' ||
        event.KillerName !== account.summoner.name ||
        current.includes(event.VictimName)
      ) {
        return current;
      }
      return [...current, event.VictimName];
    }, []);

    if (championKills.length <= (trophyData.trophyHunterKing || 0)) {
      return 0;
    }

    trophyData.trophyHunterKing = championKills.length;
    const trophyHunt = championKills.length >= 5;
    if (!trophyHunt) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'trophyHunterKing');
    return Number(trophyHunt) / 3 + trophyProgress;
  },
};

export default trophyHunterKing;
