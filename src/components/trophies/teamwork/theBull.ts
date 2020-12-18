import { Trophy } from '../types';
import { getParticipantDeaths } from '../../../api/riot/helpers';

const theBull: Trophy = {
  island: 'teamwork',
  name: 'theBull',
  level: 'teamwork4',
  title: 'The Bull',
  description: 'You never go down to only one or two opponents.',
  category: 'teamwork',
  checkProgress: ({ participant, events }) => {
    const deaths = getParticipantDeaths(events, participant.participantId);
    const nonBullDeaths = deaths.filter(
      (event) => event.assistingParticipantIds.length < 2
    ).length;

    return Number(nonBullDeaths === 0);
  },
};

export default theBull;
