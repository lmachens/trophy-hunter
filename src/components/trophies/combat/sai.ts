import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const sai: Trophy = {
  island: 'combatIsland',
  name: 'sai',
  level: 'combat5',
  title: 'Sai',
  description:
    'Achieve a takedown on at least four enemy champions before ten minutes.',
  category: 'combat',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    const killsBefore10 = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp <= 10 * 60000
    ).length;

    return killsBefore10 / 4;
  },
  checkLive: ({ events, account }) => {
    const killsBefore10 = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.EventTime <= 10 * 60
    ).length;

    return killsBefore10 / 4;
  },
};

export default sai;
