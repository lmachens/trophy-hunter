import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const maniac: Trophy = {
  island: 'skills',
  name: 'maniac',
  level: 'skills2',
  title: 'Maniac',
  description: `Score at least 10 kills in a match.\nARAM: 12 kills`,
  category: 'skills',
  aramSupport: true,
  checkProgress: ({ participant, match }) => {
    const requiredKills = match.info.queueId === ARAM_HOWLING_ABYSS ? 12 : 10;

    return participant.kills / requiredKills;
  },
  checkLive: ({ allPlayers, account, gameData }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const requiredKills = gameData.gameMode === 'ARAM' ? 12 : 10;
    return accountPlayer.scores.kills / requiredKills;
  },
};

export default maniac;
