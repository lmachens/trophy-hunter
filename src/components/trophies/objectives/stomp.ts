import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const stomp: Trophy = {
  island: 'objectivesIsland',
  name: 'stomp',
  level: 'objectives4',
  title: 'Stomp',
  description: 'Win a game in less than 22 minutes.',
  category: 'objectives',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return Number(match.gameDuration < 22 * 60 && participant.stats.win);
  },
};

export default stomp;
