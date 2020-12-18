import { Trophy } from '../types';

const duelist: Trophy = {
  island: 'combat',
  name: 'duelist',
  level: 'combat2',
  title: 'Duelist',
  description: 'Achieve three solo kills.',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    const soloKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.assistingParticipantIds.length === 0
    ).length;
    return soloKills / 3;
  },
  checkLive: ({ events, account }) => {
    const soloKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.Assisters.length === 0
    ).length;
    return soloKills / 3;
  },
};

export default duelist;
