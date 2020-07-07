import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const dusk: Trophy = {
  island: 'teamworkIsland',
  name: 'dusk',
  level: 'teamwork3',
  title: 'Dusk',
  description: 'Destroy at least six enemy wards.',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return participant.stats.wardsKilled / 6;
  },
};

export default dusk;
