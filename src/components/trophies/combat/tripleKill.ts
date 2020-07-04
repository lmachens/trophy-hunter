import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const tripleKill: Trophy = {
  island: 'combatIsland',
  name: 'tripleKill',
  level: 'combat4',
  title: 'Triple Kill',
  description: 'Achieve a triplekill.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return Number(participant.stats.tripleKills > 0);
  },
  checkLive: ({ events, account }) => {
    const hasTripleKill = events.some(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 3
    );
    return Number(hasTripleKill);
  },
};

export default tripleKill;
