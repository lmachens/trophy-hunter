import { Trophy } from '../types';
import {
  getParticipantByAccount,
  getLevelUps,
} from '../../../api/riot/helpers';

const blitzkrieg: Trophy = {
  island: 'combatIsland',
  name: 'blitzkrieg',
  level: 'combat4',
  title: 'Blitzkrieg',
  description: 'Achieve a kill before reaching level 3.',
  category: 'combat',
  checkProgress: ({ match, timeline, account }) => {
    const participant = getParticipantByAccount(match, account);
    const levelUps = getLevelUps(timeline, participant.participantId);
    const levelThreeEvent = levelUps[2];
    if (!levelThreeEvent) {
      return 0;
    }

    const killsBeforeLevelThree = timeline.frames.reduce(
      (current, frame) => [
        ...current,
        ...frame.events.filter(
          (event) =>
            event.type === 'CHAMPION_KILL' &&
            event.killerId === participant.participantId &&
            event.timestamp <= levelThreeEvent.timestamp
        ),
      ],
      []
    );
    return killsBeforeLevelThree.length;
  },
  checkLive: ({ activePlayer, events, account }) => {
    if (!events.length || activePlayer.level >= 3) {
      return 0;
    }

    const hasKill = Boolean(
      events.find(
        (event) =>
          event.EventName === 'ChampionKill' &&
          event.KillerName === account.summoner.name
      )
    );
    return Number(hasKill);
  },
};

export default blitzkrieg;
