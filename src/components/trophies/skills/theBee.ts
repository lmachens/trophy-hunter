import { Trophy } from '../types';
import {
  getMinionsAtMin,
  getOtherParticipants,
} from '../../../api/riot/helpers';

const theBee: Trophy = {
  island: 'skills',
  name: 'theBee',
  level: 'skills6',
  title: 'The Bee',
  description:
    'Diligence and hard work is key. Be ahead of everyone at least ten cs at ten minutes and 20 cs at 20 minutes.',
  category: 'skills',
  checkProgress: ({ match, participant, timeline }) => {
    const others = getOtherParticipants(match, participant);
    const participantMinionsAt10 = getMinionsAtMin(
      timeline,
      10,
      participant.participantId
    );
    const participantMinionsAt20 = getMinionsAtMin(
      timeline,
      20,
      participant.participantId
    );

    const maxCsTen = Math.max(
      ...others.map((other) =>
        getMinionsAtMin(timeline, 10, other.participantId)
      )
    );
    const maxCsTwenty = Math.max(
      ...others.map((other) =>
        getMinionsAtMin(timeline, 20, other.participantId)
      )
    );
    return Number(
      participantMinionsAt10 >= maxCsTen + 10 &&
        participantMinionsAt20 >= maxCsTwenty + 20
    );
  },
};

export default theBee;
