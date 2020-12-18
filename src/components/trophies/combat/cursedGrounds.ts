import { Trophy } from '../types';
import { BUFF_POSITIONS } from '../../../api/riot/helpers';
import { TEN_MINUTES } from '../../../api/utils/dates';

const cursedGrounds: Trophy = {
  island: 'combat',
  name: 'cursedGrounds',
  level: 'combat4',
  title: 'Cursed Grounds',
  description: 'Kill an opponent around a red or blue buff before 10 minutes.',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    const validKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp <= TEN_MINUTES &&
        BUFF_POSITIONS.some(([x, y]) => {
          const distanceToBuff = Math.sqrt(
            (event.position.x - x) * (event.position.x - x) +
              (event.position.y - y) * (event.position.y - y)
          );
          return distanceToBuff <= 1250;
        })
    );
    return validKills.length;
  },
};

export default cursedGrounds;
