import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const quackery: Trophy = {
  island: 'teamworkIsland',
  name: 'quackery',
  level: 'teamwork4',
  title: 'Quackery',
  description: 'Heal five players and at least 15000 damage.',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return Number(
      participant.stats.totalHeal >= 15000 &&
        participant.stats.totalUnitsHealed >= 5
    );
  },
};

export default quackery;
