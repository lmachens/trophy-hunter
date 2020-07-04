import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const superiorEquipment: Trophy = {
  island: 'combatIsland',
  name: 'superiorEquipment',
  level: 'combat5',
  title: 'Superior Equipment',
  description:
    'Have more than 1.67 times more damage dealt to champions than damage taken.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const damageDealtToTakenRatio =
      participant.stats.totalDamageDealtToChampions /
      Math.max(1, participant.stats.totalDamageTaken);

    return damageDealtToTakenRatio / 1.67;
  },
};

export default superiorEquipment;
