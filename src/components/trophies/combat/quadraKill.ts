import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const quadraKill: Trophy = {
  island: 'combatIsland',
  name: 'quadraKill',
  level: 'combat8',
  title: 'Quadra Kill',
  description: 'Achieve a quadra kill.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return participant.stats.quadraKills;
  },
  checkLive: ({ events, account }) => {
    const quadraKill = events.find(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 4
    );

    return Number(quadraKill);
  },
};

export default quadraKill;
