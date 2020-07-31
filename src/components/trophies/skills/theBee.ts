import { Trophy } from '../types';
import {
  getParticipantByAccount,
  getOtherParticipants,
} from '../../../api/riot/helpers';

const theBee: Trophy = {
  island: 'skillsIsland',
  name: 'theBee',
  level: 'skills6',
  title: 'The Bee',
  description:
    'Diligence and hard work is key. Be ahead of everyone at least ten cs at ten minutes and 20 cs at 20 minutes.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    if (!participant.timeline.creepsPerMinDeltas) {
      return 0;
    }
    const others = getOtherParticipants(match, participant);
    const maxCsTen = Math.max(
      ...others.map((other) =>
        other.timeline && other.timeline.creepsPerMinDeltas
          ? other.timeline.creepsPerMinDeltas['0-10']
          : 0
      )
    );
    const maxCsTwenty = Math.max(
      ...others.map((other) =>
        other.timeline && other.timeline.creepsPerMinDeltas
          ? other.timeline.creepsPerMinDeltas['10-20']
          : 0
      )
    );
    return Number(
      participant.timeline.creepsPerMinDeltas['0-10'] >= maxCsTen + 1 &&
        participant.timeline.creepsPerMinDeltas['0-10'] +
          participant.timeline.creepsPerMinDeltas['10-20'] >=
          maxCsTwenty + 2
    );
  },
};

export default theBee;
