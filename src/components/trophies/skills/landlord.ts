import { Trophy } from '../types';

const landlord: Trophy = {
  island: 'skills',
  name: 'landlord',
  level: 'skills3',
  title: 'Landlord',
  description: 'Farm more than 300 minions.',
  category: 'skills',
  checkProgress: ({ participant }) => {
    return (
      (participant.totalMinionsKilled + participant.neutralMinionsKilled) / 300
    );
  },
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    return accountPlayer.scores.creepScore / 300;
  },
};

export default landlord;
