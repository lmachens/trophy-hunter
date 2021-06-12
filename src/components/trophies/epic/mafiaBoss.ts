import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const mafiaBoss: Trophy = {
  island: 'epic',
  name: 'mafiaBoss',
  level: 'epic1',
  title: 'Mafia Boss',
  description: `Achieve at least 30 assists in a match.\nARAM: 40 assists`,
  category: 'epic',
  aramSupport: true,
  checkProgress: ({ participant, match }) => {
    const requiredAssists = match.info.queueId === ARAM_HOWLING_ABYSS ? 40 : 30;
    return participant.assists / requiredAssists;
  },
  checkLive: ({ allPlayers, account, gameData }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const requiredAssists = gameData.gameMode === 'ARAM' ? 40 : 30;
    return accountPlayer.scores.assists / requiredAssists;
  },
};

export default mafiaBoss;
