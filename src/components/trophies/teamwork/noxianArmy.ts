import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const noxianArmy: Trophy = {
  island: 'teamworkIsland',
  name: 'noxianArmy',
  level: 'teamwork3',
  title: 'Noxian Army',
  description:
    "Have at least eight kills, eight assists and don't die more than 6 times.",
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return Number(
      participant.stats.kills >= 8 &&
        participant.stats.deaths <= 6 &&
        participant.stats.assists >= 8
    );
  },
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    if (accountPlayer.scores.deaths > 6) {
      return 0;
    }

    return (
      (Math.min(1, accountPlayer.scores.kills / 8) +
        Math.min(1, accountPlayer.scores.assists / 8)) /
      2.1
    );
  },
};

export default noxianArmy;
