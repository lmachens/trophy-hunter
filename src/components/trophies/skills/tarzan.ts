import { Trophy } from '../types';
import { getOtherParticipants } from '../../../api/riot/helpers';

const tarzan: Trophy = {
  island: 'skills',
  name: 'tarzan',
  level: 'skills6',
  title: 'Tarzan',
  description:
    'Kill most neutral monsters and be at least one level above everyone else in the end.',
  category: 'skills',
  checkProgress: ({ match, participant }) => {
    const maxNeutralMinionsKilled = Math.max(
      ...match.info.participants.map(
        (participant) => participant.neutralMinionsKilled
      )
    );

    const others = getOtherParticipants(match, participant);
    const otherMaxChampLevel = Math.max(
      ...others.map((other) => other.champLevel)
    );

    return Number(
      participant.neutralMinionsKilled >= maxNeutralMinionsKilled &&
        participant.champLevel > otherMaxChampLevel
    );
  },
};

export default tarzan;
