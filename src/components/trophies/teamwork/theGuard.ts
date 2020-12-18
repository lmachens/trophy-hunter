import { Trophy } from '../types';
import { findPerk } from '../../../api/accounts/helpers';

const theGuard: Trophy = {
  island: 'teamwork',
  name: 'theGuard',
  level: 'teamwork5',
  title: 'The Guard',
  description:
    'Shield your allies for at least 4000 damage using Guardian in one match (rune).',
  category: 'teamwork',
  checkProgress: ({ participant }) => {
    const guardian = findPerk(participant, 8465);
    return Number(guardian.var1 >= 4000);
  },
};

export default theGuard;
