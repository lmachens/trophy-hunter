import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { findPerk } from '../../../api/accounts/helpers';

const lifeAndDeath: Trophy = {
  island: 'teamworkIsland',
  name: 'lifeAndDeath',
  level: 'teamwork3',
  title: 'Life And Death',
  description: 'Deal and heal more than 1200 with grasp of the undying (rune).',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const lifeAndDeath = findPerk(participant, 8437);

    return Number(lifeAndDeath.var1 >= 1200 && lifeAndDeath.var2 >= 1200);
  },
};

export default lifeAndDeath;
