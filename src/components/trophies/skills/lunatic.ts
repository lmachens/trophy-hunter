import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const lunatic: Trophy = {
  island: 'skills',
  name: 'lunatic',
  level: 'skills4',
  title: 'Lunatic',
  description: `Score at least 20 kills in a match.\nARAM: 24 kills`,
  category: 'skills',
  aramSupport: true,
  checkProgress: ({ participant, match }) => {
    const requiredKills = match.queueId === ARAM_HOWLING_ABYSS ? 24 : 20;
    return participant.stats.kills / requiredKills;
  },
  checkLive: ({ allPlayers, account, gameData }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const requiredKills = gameData.gameMode === 'ARAM' ? 24 : 20;
    return accountPlayer.scores.kills / requiredKills;
  },
};

export default lunatic;
