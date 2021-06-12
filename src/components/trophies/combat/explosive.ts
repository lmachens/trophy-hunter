import { Trophy } from '../types';

const explosive: Trophy = {
  island: 'combat',
  name: 'explosive',
  level: 'combat4',
  title: 'Explosive',
  description:
    'Achieve a killing spree of at least five, a multi kill of at least three and a critical strike above 800.',
  category: 'combat',
  checkProgress: ({ participant }) => {
    const progress =
      Number(participant.largestKillingSpree >= 5) +
      Number(participant.largestMultiKill >= 3) +
      Number(participant.largestCriticalStrike >= 800);

    return progress / 3;
  },
};

export default explosive;
