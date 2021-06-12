import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const skullHunter: Trophy = {
  island: 'combat',
  name: 'skullHunter',
  level: 'combat1',
  title: 'Skull Hunter',
  description: 'Be involved in at least 20 kills.',
  category: 'combat',
  maxProgress: 20,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'skullHunter');

    const killsAssists = participant.assists + participant.kills;
    return killsAssists / 20 + trophyProgress;
  },
  checkLive: ({ allPlayers, trophyData, gameData, account }) => {
    if (
      !allPlayers ||
      !gameData ||
      trophyData.skullHunter ||
      gameData.gameTime > 1200
    ) {
      return 0;
    }

    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const trophyProgress = getTrophyProgress(account, 'skullHunter');

    const killsAssists =
      accountPlayer.scores.assists + accountPlayer.scores.kills;
    const process = Math.min(1, killsAssists / 20 + trophyProgress);
    if (process === 1) {
      trophyData.skullHunter = true;
    }
    return process;
  },
};

export default skullHunter;
