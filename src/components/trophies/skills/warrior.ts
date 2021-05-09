import { Trophy } from '../types';
import { calcKDA } from '../../../api/riot/helpers';

const warrior: Trophy = {
  island: 'skills',
  name: 'warrior',
  level: 'hubSkills',
  title: 'Warrior',
  description: 'Have a KDA of at least 1.5',
  category: 'skills',
  aramSupport: true,
  checkProgress: ({ participant }) => {
    return calcKDA(participant) / 1.5;
  },
  checkLive: ({ allPlayers, account }) => {
    const player = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const kda =
      (player.scores.kills + player.scores.assists) / player.scores.deaths;
    return Math.min(kda, 0.9);
  },
};

export default warrior;
