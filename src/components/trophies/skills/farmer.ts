import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const farmer: Trophy = {
  island: 'hubIsland',
  name: 'farmer',
  level: 'hubSkills',
  title: 'Farmer',
  description: 'Farm more than 200 minions.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    return Number(participant.stats.totalMinionsKilled >= 200);
  },
  checkLive: ({ allPlayers, trophyData, account }) => {
    if (trophyData.farmer || !allPlayers) {
      return 0;
    }

    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    if (accountPlayer.scores.creepScore >= 200) {
      trophyData.farmer = true;
    }

    return Math.min(1, accountPlayer.scores.creepScore / 200);
  },
};

export default farmer;
