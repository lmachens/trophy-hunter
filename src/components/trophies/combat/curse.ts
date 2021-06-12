import { minutesToSeconds } from '../../../api/utils/dates';
import { Trophy } from '../types';

const REQUIRED_MINUTES = 40;

const curse: Trophy = {
  island: 'combat',
  name: 'curse',
  level: 'combat7',
  title: 'Curse',
  description: `The total crowd control time that you dealt exceeds ${REQUIRED_MINUTES} minutes.`,
  category: 'combat',
  checkProgress: ({ participant }) => {
    return (
      participant.totalTimeCrowdControlDealt /
      minutesToSeconds(REQUIRED_MINUTES)
    );
  },
};

export default curse;
