import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const disruptor: Trophy = {
  island: 'skillsIsland',
  name: 'disruptor',
  level: 'skills1',
  title: 'Disruptor',
  description: 'Have highest time crowd control dealt.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const maxTotalTimeCrowdControlDealt = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.totalTimeCrowdControlDealt
      )
    );

    return Number(
      participant.stats.totalTimeCrowdControlDealt >=
        maxTotalTimeCrowdControlDealt
    );
  },
};

export default disruptor;
