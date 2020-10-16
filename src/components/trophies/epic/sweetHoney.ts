import { getMinionsAtMin } from '../../../api/riot/helpers';
import { Trophy } from '../types';

const sweetHoney: Trophy = {
  island: 'hubIsland',
  name: 'sweetHoney',
  level: 'hubEpic',
  title: 'Sweet Honey',
  description: 'Farm at least 180 minions at 20 minutes.',
  category: 'epic',
  checkProgress: ({ participant, timeline }) => {
    const minions = getMinionsAtMin(timeline, 20, participant.participantId);
    return minions / 180;
  },
  checkLive: ({ allPlayers, gameData, account }) => {
    if (gameData.gameTime > 1200) {
      return 0;
    }

    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const process = Math.min(1, accountPlayer.scores.creepScore / 180);
    return process;
  },
};

export default sweetHoney;
