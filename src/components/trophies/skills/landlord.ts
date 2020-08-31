import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const landlord: Trophy = {
  island: 'skillsIsland',
  name: 'landlord',
  level: 'skills3',
  title: 'landlord',
  description: 'Farm more than 300 minions.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    return (
      (participant.stats.totalMinionsKilled +
        participant.stats.neutralMinionsKilled) /
      300
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
