import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const highSociety: Trophy = {
  island: 'teamworkIsland',
  name: 'highSociety',
  level: 'teamwork3',
  title: 'High Society',
  description: 'Let others do the dirty work. Score at least 20 assists.',
  category: 'teamwork',
  maxProgress: 20,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'highSociety');
    return participant.stats.assists / 20 + trophyProgress;
  },
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const trophyProgress = getTrophyProgress(account, 'highSociety');
    return accountPlayer.scores.assists / 20 + trophyProgress;
  },
};

export default highSociety;
