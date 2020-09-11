import { Trophy } from '../types';

const lunatic: Trophy = {
  island: 'skillsIsland',
  name: 'lunatic',
  level: 'skills4',
  title: 'Lunatic',
  description: 'Score at least 20 kills in a match.',
  category: 'skills',
  checkProgress: ({ participant }) => {
    return participant.stats.kills / 20;
  },
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    return accountPlayer.scores.kills / 20;
  },
};

export default lunatic;
