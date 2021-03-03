import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const sai: Trophy = {
  island: 'combat',
  name: 'sai',
  level: 'combat5',
  title: 'Sai',
  description: `Achieve a takedown on at least four enemy champions before ten minutes.\nARAM: Five takedowns`,
  category: 'combat',
  aramSupport: true,
  checkProgress: ({ events, participant, match }) => {
    const killsBefore10 = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp <= 10 * 60000
    ).length;

    const requiredTakedowns = match.queueId === ARAM_HOWLING_ABYSS ? 5 : 4;
    return killsBefore10 / requiredTakedowns;
  },
  checkLive: ({ events, account, gameData }) => {
    const killsBefore10 = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.EventTime <= 10 * 60
    ).length;
    const requiredTakedowns = gameData.gameMode === 'ARAM' ? 5 : 4;
    return killsBefore10 / requiredTakedowns;
  },
};

export default sai;
