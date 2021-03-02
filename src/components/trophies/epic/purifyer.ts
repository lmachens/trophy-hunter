import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const purifyer: Trophy = {
  island: 'epic',
  name: 'purifyer',
  level: 'epic1',
  title: 'Purifyer',
  description: `Score at least 30 kills in a match.\nARAM: 32 kills`,
  category: 'epic',
  aramSupport: true,
  checkProgress: ({ participant, match }) => {
    const requiredKills = match.queueId === ARAM_HOWLING_ABYSS ? 32 : 30;
    return participant.stats.kills / requiredKills;
  },
  checkLive: ({ allPlayers, account, gameData }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const requiredKills = gameData.gameMode === 'ARAM' ? 32 : 30;
    return accountPlayer.scores.kills / requiredKills;
  },
};

export default purifyer;
