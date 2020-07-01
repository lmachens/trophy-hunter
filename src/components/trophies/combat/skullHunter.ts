import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const skullHunter: Trophy = {
  island: 'combatIsland',
  name: 'skullHunter',
  level: 'combat1',
  title: 'Skull Hunter',
  description: 'Be involved in at least 20 kills.',
  category: 'combat',
  maxProgress: 20,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'skullHunter'
    );
    const killsAssists =
      participant.stats.assists +
      participant.stats.kills +
      (existingTrophy ? existingTrophy.progress : 0);
    return killsAssists / 20;
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
    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'skullHunter'
    );

    const killsAssists =
      accountPlayer.scores.assists +
      accountPlayer.scores.kills +
      (existingTrophy ? existingTrophy.progress : 0);
    const process = Math.min(1, killsAssists / 20);
    if (process === 1) {
      trophyData.skullHunter = true;
    }
    return process;
  },
};

export default skullHunter;
