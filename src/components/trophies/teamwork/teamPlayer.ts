import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const teamPlayer: Trophy = {
  island: 'teamworkIsland',
  name: 'teamPlayer',
  level: 'teamwork1',
  title: 'Team Player',
  description: 'Score at least ten assists.',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return participant.stats.assists / 10;
  },
  checkLive: ({ events, account }) => {
    const assists = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters.includes(account.summoner.name)
    );

    return assists.length / 10;
  },
};

export default teamPlayer;
