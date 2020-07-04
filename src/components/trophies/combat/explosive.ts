import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const explosive: Trophy = {
  island: 'combatIsland',
  name: 'explosive',
  level: 'combat4',
  title: 'Explosive',
  description:
    'Achieve a killing spree of at least five, a multi kill of at least three and a critical strike above 800.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const progress =
      Number(participant.stats.largestKillingSpree >= 5) +
      Number(participant.stats.largestMultiKill >= 3) +
      Number(participant.stats.largestCriticalStrike >= 800);

    return progress / 3;
  },
};

export default explosive;
