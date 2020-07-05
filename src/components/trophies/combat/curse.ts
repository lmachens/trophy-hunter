import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const curse: Trophy = {
  island: 'combatIsland',
  name: 'curse',
  level: 'combat7',
  title: 'curse',
  description: 'The total crowd control time that you dealt exceeds one hour.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return participant.stats.totalTimeCrowdControlDealt / 3600;
  },
};

export default curse;
