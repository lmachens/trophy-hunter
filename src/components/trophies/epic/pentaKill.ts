import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const pentaKill: Trophy = {
  island: 'epicIsland',
  name: 'pentaKill',
  level: 'epic1',
  title: 'Penta Kill',
  description: 'Achieve a penta kill.',
  category: 'epic',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return participant.stats.pentaKills;
  },
  checkLive: ({ events, account }) => {
    const hasPentaKill = events.some(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillStreak === 5 &&
        event.KillerName === account.summoner.name
    );

    return Number(hasPentaKill);
  },
};

export default pentaKill;
