import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const mafiaBoss: Trophy = {
  island: 'epic',
  name: 'mafiaBoss',
  level: 'epic1',
  title: 'Mafia Boss',
  description: `Don't get your hands dirty, but achieve at least 30 assists in a match.\nARAM: 40 assists`,
  category: 'epic',
  aramSupport: true,
  checkProgress: ({ participant, match }) => {
    const requiredAssists = match.queueId === ARAM_HOWLING_ABYSS ? 30 : 40;
    return participant.stats.assists / requiredAssists;
  },
  checkLive: ({ allPlayers, account, gameData }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const requiredAssists = gameData.gameMode === 'ARAM' ? 30 : 40;
    return accountPlayer.scores.assists / requiredAssists;
  },
};

export default mafiaBoss;
