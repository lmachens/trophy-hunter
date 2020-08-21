import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const sweetHoney: Trophy = {
  island: 'hubIsland',
  name: 'sweetHoney',
  level: 'hubEpic',
  title: 'Sweet Honey',
  description: 'Farm at least 180 minions at 20 minutes.',
  category: 'epic',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return (
      (participant.timeline.creepsPerMinDeltas['0-10'] +
        participant.timeline.creepsPerMinDeltas['10-20']) /
        18 || 0
    );
  },
  checkLive: ({ allPlayers, trophyData, gameData, account }) => {
    if (
      !allPlayers ||
      !gameData ||
      trophyData.sweetHoney ||
      gameData.gameTime > 1200
    ) {
      return 0;
    }

    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const process = Math.min(1, accountPlayer.scores.creepScore / 180);
    if (process === 1) {
      trophyData.sweetHoney = true;
    }
    return process;
  },
};

export default sweetHoney;
