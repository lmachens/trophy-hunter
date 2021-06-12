import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const stomp: Trophy = {
  island: 'objectives',
  name: 'stomp',
  level: 'objectives4',
  title: 'Stomp',
  description: `Win a game in less than 22 minutes.\nARAM: 16 minutes`,
  category: 'objectives',
  aramSupport: true,
  checkProgress: ({ match, participant }) => {
    const requiredDuration =
      match.info.queueId === ARAM_HOWLING_ABYSS ? 16 : 22;

    return Number(
      match.info.gameDuration < requiredDuration * 60 && participant.win
    );
  },
};

export default stomp;
