import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const superiorBrain: Trophy = {
  island: 'combatIsland',
  name: 'superiorBrain',
  level: 'combat5',
  title: 'Superior Brain',
  description:
    'Have more than twice damage to enemy champions than damage taken.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const damageDealtToTakenRatio =
      participant.stats.totalDamageDealtToChampions /
      Math.max(1, participant.stats.totalDamageTaken);

    return damageDealtToTakenRatio / 2;
  },
};

export default superiorBrain;
