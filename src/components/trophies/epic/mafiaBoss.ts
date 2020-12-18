import { Trophy } from '../types';

const mafiaBoss: Trophy = {
  island: 'epic',
  name: 'mafiaBoss',
  level: 'epic1',
  title: 'Mafia Boss',
  description:
    "Don't get your hands dirty, but achieve at least 30 assists in a match.",
  category: 'epic',
  checkProgress: ({ participant }) => {
    return participant.stats.assists / 30;
  },
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    return accountPlayer.scores.assists / 30;
  },
};

export default mafiaBoss;
