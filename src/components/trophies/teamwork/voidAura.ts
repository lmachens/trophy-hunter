import { Trophy } from '../types';
import { getTrophyProgress, findPerk } from '../../../api/accounts/helpers';

const voidAura: Trophy = {
  island: 'teamwork',
  name: 'voidAura',
  level: 'teamwork5',
  title: 'Void Aura',
  description: 'Regenerate 2000 mana using presence of mind (rune).',
  category: 'teamwork',
  maxProgress: 2000,
  checkProgress: ({ participant, account }) => {
    const lifeAndDeath = findPerk(participant, 8009);
    const trophyProgress = getTrophyProgress(account, 'voidAura');

    return (lifeAndDeath.var1 + lifeAndDeath.var2) / 2000 + trophyProgress;
  },
};

export default voidAura;
