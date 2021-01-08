import { Trophy } from '../types';

const pesticide: Trophy = {
  island: 'epic',
  name: 'pesticide',
  level: 'epic1',
  title: 'Pesticide',
  description: 'Kill more than 380 minions in a match.',
  category: 'epic',
  checkProgress: ({ participant }) => {
    return (
      (participant.stats.totalMinionsKilled +
        participant.stats.neutralMinionsKilled) /
      380
    );
  },
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    return accountPlayer.scores.creepScore / 380;
  },
};

export default pesticide;
