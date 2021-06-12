import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const teamPlayer: Trophy = {
  island: 'teamwork',
  name: 'teamPlayer',
  level: 'teamwork1',
  title: 'Team Player',
  description: `Score at least ten assists.\nARAM: 20 assists`,
  category: 'teamwork',
  aramSupport: true,
  checkProgress: ({ participant, match }) => {
    const requiredAssists = match.info.queueId === ARAM_HOWLING_ABYSS ? 20 : 10;
    return participant.assists / requiredAssists;
  },
  checkLive: ({ events, account, gameData }) => {
    const requiredAssists = gameData.gameMode === 'ARAM' ? 20 : 10;
    const assists = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters.includes(account.summoner.name)
    );

    return assists.length / requiredAssists;
  },
};

export default teamPlayer;
