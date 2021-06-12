import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const snowball: Trophy = {
  island: 'combat',
  name: 'snowball',
  level: 'combat4',
  title: 'Snowball',
  description: `Achieve five kills before twelve minutes.\nARAM: Seven kills`,
  category: 'combat',
  aramSupport: true,
  checkProgress: ({ events, participant, match }) => {
    const requiredKills = match.info.queueId === ARAM_HOWLING_ABYSS ? 7 : 5;
    const snowballKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp < 720000
    ).length;

    return snowballKills / requiredKills;
  },
  checkLive: ({ events, account, gameData }) => {
    const requiredKills = gameData.gameMode === 'ARAM' ? 7 : 5;

    const snowballKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.EventTime < 720
    ).length;

    return snowballKills / requiredKills;
  },
};

export default snowball;
