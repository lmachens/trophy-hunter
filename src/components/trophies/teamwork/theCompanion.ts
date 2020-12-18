import { Trophy } from '../types';
import { findPerk } from '../../../api/accounts/helpers';

const theCompanion: Trophy = {
  island: 'teamwork',
  name: 'theCompanion',
  level: 'teamwork4',
  title: 'The Companion',
  description:
    'Deal and shield more than 750 with summoner aery in one match (rune).',
  category: 'teamwork',
  checkProgress: ({ participant }) => {
    const summonerAery = findPerk(participant, 8214);
    return Number(summonerAery.var1 >= 750 && summonerAery.var2 >= 750);
  },
};

export default theCompanion;
