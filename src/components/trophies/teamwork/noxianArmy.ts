import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const noxianArmy: Trophy = {
  island: 'teamwork',
  name: 'noxianArmy',
  level: 'teamwork3',
  title: 'Noxian Army',
  description: `Have at least eight kills, eight assists and don't die more than 6 times.\nARAM: 10 kills, 10 assists, 5 deaths`,
  category: 'teamwork',
  aramSupport: true,
  checkProgress: ({ participant, match }) => {
    const requiredKills = match.info.queueId === ARAM_HOWLING_ABYSS ? 10 : 8;
    const requiredDeaths = match.info.queueId === ARAM_HOWLING_ABYSS ? 10 : 8;
    const requiredAssists = match.info.queueId === ARAM_HOWLING_ABYSS ? 5 : 6;
    return Number(
      participant.kills >= requiredKills &&
        participant.deaths <= requiredDeaths &&
        participant.assists >= requiredAssists
    );
  },
  checkLive: ({ allPlayers, account, gameData }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const requiredKills = gameData.gameMode === 'ARAM' ? 10 : 8;
    const requiredDeaths = gameData.gameMode === 'ARAM' ? 10 : 8;
    const requiredAssists = gameData.gameMode === 'ARAM' ? 5 : 6;

    if (accountPlayer.scores.deaths > requiredDeaths) {
      return 0;
    }

    return (
      (Math.min(1, accountPlayer.scores.kills / requiredKills) +
        Math.min(1, accountPlayer.scores.assists / requiredAssists)) /
      2.1
    );
  },
};

export default noxianArmy;
