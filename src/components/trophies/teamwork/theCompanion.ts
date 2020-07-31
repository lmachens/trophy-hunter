import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { findPerk } from '../../../api/accounts/helpers';

const theCompanion: Trophy = {
  island: 'teamworkIsland',
  name: 'theCompanion',
  level: 'teamwork4',
  title: 'The Companion',
  description:
    'Deal and shield more than 750 with summoner aery in one match (rune).',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const summonerAery = findPerk(participant, 8214);
    return Number(summonerAery.var1 >= 750 && summonerAery.var2 >= 750);
  },
};

export default theCompanion;
