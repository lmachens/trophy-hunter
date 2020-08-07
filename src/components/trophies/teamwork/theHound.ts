import { Trophy } from '../types';
import {
  getParticipantByAccount,
  getParticipantAssists,
} from '../../../api/riot/helpers';

const theHound: Trophy = {
  island: 'teamworkIsland',
  name: 'theHound',
  level: 'teamwork8',
  title: 'The Hound',
  description:
    'Set up others to carry. Achieve five assists before ten minutes.',
  category: 'teamwork',
  checkProgress: ({ match, account, events }) => {
    const participant = getParticipantByAccount(match, account);
    const assists = getParticipantAssists(
      events,
      participant.participantId
    ).filter((assist) => assist.timestamp < 600000);

    return assists.length / 5;
  },
  checkLive: ({ events, account }) => {
    const assists = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters.includes(account.summoner.name) &&
        event.EventTime < 600
    );
    return assists.length / 5;
  },
};

export default theHound;
