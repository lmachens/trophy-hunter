import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const superiorPosition: Trophy = {
  island: 'combatIsland',
  name: 'superiorPosition',
  level: 'combat1',
  title: 'Superior Position',
  description:
    'Have more than 1.34 times more damage dealt to champions than damage taken.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const damageDealtToTakenRatio =
      participant.stats.totalDamageDealtToChampions /
      Math.max(1, participant.stats.totalDamageTaken);
    return damageDealtToTakenRatio / 1.34;
  },
};

export default superiorPosition;
