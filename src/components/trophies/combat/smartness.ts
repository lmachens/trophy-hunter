import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const smartness: Trophy = {
  island: 'combatIsland',
  name: 'smartness',
  level: 'combat2',
  title: 'Smartness',
  description:
    'Score a killing spree, at least ten assists and die at most five times.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    const hasKillingSpree = participant.stats.killingSprees >= 1;
    const hasTenAssists = participant.stats.assists >= 10;
    const hasLessThanFiveDeaths = participant.stats.deaths <= 5;

    return Number(hasKillingSpree && hasTenAssists && hasLessThanFiveDeaths);
  },
};

export default smartness;
