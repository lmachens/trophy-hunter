import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const snowball: Trophy = {
  island: 'combatIsland',
  name: 'snowball',
  level: 'combat4',
  title: 'Snowball',
  description: 'Achieve five kills before twelve minutes.',
  category: 'combat',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    const snowballKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp < 720000
    ).length;

    return snowballKills / 5;
  },
  checkLive: ({ events, account }) => {
    const snowballKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.EventTime < 720
    ).length;

    return snowballKills / 5;
  },
};

export default snowball;
