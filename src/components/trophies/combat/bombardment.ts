import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const bombardment: Trophy = {
  island: 'combat',
  name: 'bombardment',
  level: 'combat2',
  title: 'Bombardment',
  description: `Deal more than 1000 damage to champions per minute.\nARAM: 1500 damage per minute`,
  category: 'combat',
  aramSupport: true,
  checkProgress: ({ match, participant }) => {
    const damagePerMinute =
      (60 * participant.totalDamageDealtToChampions) / match.info.gameDuration;

    if (match.info.queueId === ARAM_HOWLING_ABYSS) {
      return damagePerMinute / 1500;
    }

    return damagePerMinute / 1000;
  },
};

export default bombardment;
