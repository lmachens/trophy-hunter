import { Trophy } from '../types';

const maniac: Trophy = {
  island: 'skillsIsland',
  name: 'maniac',
  level: 'skills2',
  title: 'Maniac',
  description: 'Score at least 10 kills in a match.',
  category: 'skills',
  checkProgress: ({ participant }) => {
    return participant.stats.kills / 10;
  },
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    return accountPlayer.scores.kills / 10;
  },
};

export default maniac;
