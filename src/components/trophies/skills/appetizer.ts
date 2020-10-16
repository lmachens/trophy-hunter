import { getMinionsAtMin } from '../../../api/riot/helpers';
import { Trophy } from '../types';

const appetizer: Trophy = {
  island: 'skillsIsland',
  name: 'appetizer',
  level: 'skills5',
  title: 'Appetizer',
  description: 'Farm at least 80 minions at 10 minutes.',
  category: 'skills',
  checkProgress: ({ participant, timeline }) => {
    const minions = getMinionsAtMin(timeline, 10, participant.participantId);
    return minions / 80;
  },
  checkLive: ({ allPlayers, gameData, account }) => {
    if (gameData.gameTime > 600) {
      return 0;
    }

    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const process = Math.min(1, accountPlayer.scores.creepScore / 80);
    return process;
  },
};

export default appetizer;
