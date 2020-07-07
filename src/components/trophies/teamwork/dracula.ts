import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress, findPerk } from '../../../api/accounts/helpers';

const dracula: Trophy = {
  island: 'teamworkIsland',
  name: 'dracula',
  level: 'teamwork2',
  title: 'Dracula',
  description: 'Heal more than 2000 damage with Taste of Blood (rune).',
  category: 'teamwork',
  maxProgress: 2000,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const trophyProgress = getTrophyProgress(account, 'dracula');

    const tasteOfBlood = findPerk(participant, 8139).var1;
    return tasteOfBlood / 2000 + trophyProgress;
  },
};

export default dracula;