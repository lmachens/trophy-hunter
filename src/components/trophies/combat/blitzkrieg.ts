import { Trophy } from '../types';
import { getLevelUps } from '../../../api/riot/helpers';

const blitzkrieg: Trophy = {
  island: 'combat',
  name: 'blitzkrieg',
  level: 'combat4',
  title: 'Blitzkrieg',
  description: 'Achieve a kill before reaching level 3.',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    const levelUps = getLevelUps(events, participant.participantId);
    const levelThreeEvent = levelUps[2];
    if (!levelThreeEvent) {
      return 0;
    }
    const killsBeforeLevelThree = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp <= levelThreeEvent.timestamp
    );
    return killsBeforeLevelThree.length;
  },
  checkLive: ({ activePlayer, events, account }) => {
    if (!events.length || activePlayer.level >= 3) {
      return 0;
    }

    const hasKill = events.some(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name
    );
    return Number(hasKill);
  },
};

export default blitzkrieg;
