import { Trophy } from '../types';

const farmer: Trophy = {
  island: 'hub',
  name: 'farmer',
  level: 'hubSkills',
  title: 'Farmer',
  description: 'Farm more than 200 minions.',
  category: 'skills',
  checkProgress: ({ participant }) => {
    return (
      (participant.stats.totalMinionsKilled +
        participant.stats.neutralMinionsKilled) /
      200
    );
  },
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    return accountPlayer.scores.creepScore / 200;
  },
};

export default farmer;
