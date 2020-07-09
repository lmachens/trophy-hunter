import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const octopus: Trophy = {
  island: 'teamworkIsland',
  name: 'octopus',
  level: 'teamwork1',
  title: 'Octopus',
  description: 'Have most assists.',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    const maxAssists = Math.max(
      ...match.participants.map((other) => other.stats.assists)
    );

    return Number(participant.stats.assists >= maxAssists);
  },
};

export default octopus;
