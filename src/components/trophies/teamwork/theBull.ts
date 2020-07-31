import { Trophy } from '../types';
import {
  getParticipantByAccount,
  getParticipantDeaths,
} from '../../../api/riot/helpers';

const theBull: Trophy = {
  island: 'teamworkIsland',
  name: 'theBull',
  level: 'teamwork4',
  title: 'The Bull',
  description: 'You never go down to only one or two opponents.',
  category: 'teamwork',
  checkProgress: ({ match, account, events }) => {
    const participant = getParticipantByAccount(match, account);
    const deaths = getParticipantDeaths(events, participant.participantId);
    const nonBullDeaths = deaths.filter(
      (event) => event.assistingParticipantIds.length < 2
    ).length;

    return Number(nonBullDeaths === 0);
  },
};

export default theBull;
