import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const highSociety: Trophy = {
  island: 'teamworkIsland',
  name: 'highSociety',
  level: 'teamwork3',
  title: 'High Society',
  description: 'Let others do the dirty work. Score at least 20 assists.',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return participant.stats.assists / 20;
  },
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    return accountPlayer.scores.assists / 20;
  },
};

export default highSociety;
