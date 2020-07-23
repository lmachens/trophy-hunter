import { Trophy } from '../types';
import {
  getParticipantByAccount,
  getOtherParticipants,
} from '../../../api/riot/helpers';

const tarzan: Trophy = {
  island: 'skillsIsland',
  name: 'tarzan',
  level: 'skills6',
  title: 'Tarzan',
  description:
    'Kill most neutral monsters and be at least one level above everyone else in the end.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const maxNeutralMinionsKilled = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.neutralMinionsKilled
      )
    );

    const others = getOtherParticipants(match, participant);
    const otherMaxChampLevel = Math.max(
      ...others.map((other) => other.stats.champLevel)
    );

    return Number(
      participant.stats.neutralMinionsKilled >= maxNeutralMinionsKilled &&
        participant.stats.champLevel > otherMaxChampLevel
    );
  },
};

export default tarzan;
