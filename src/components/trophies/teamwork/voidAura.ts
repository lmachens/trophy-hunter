import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress, findPerk } from '../../../api/accounts/helpers';

const voidAura: Trophy = {
  island: 'teamworkIsland',
  name: 'voidAura',
  level: 'teamwork5',
  title: 'Void Aura',
  description: 'Regenerate 2000 mana using presence of mind (rune).',
  category: 'teamwork',
  maxProgress: 2000,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const lifeAndDeath = findPerk(participant, 8009);
    const trophyProgress = getTrophyProgress(account, 'voidAura');

    return (lifeAndDeath.var1 + lifeAndDeath.var2) / 2000 + trophyProgress;
  },
};

export default voidAura;
