import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const intruder: Trophy = {
  island: 'skillsIsland',
  name: 'intruder',
  level: 'skills3',
  title: 'Intruder',
  description: 'Take at least 25 cs from the enemy jungle.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    return Number(participant.stats.neutralMinionsKilledEnemyJungle >= 25);
  },
};

export default intruder;
