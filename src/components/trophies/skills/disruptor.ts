import { Trophy } from '../types';

const disruptor: Trophy = {
  island: 'skills',
  name: 'disruptor',
  level: 'skills1',
  title: 'Disruptor',
  description: 'Have highest time crowd control dealt.',
  category: 'skills',
  checkProgress: ({ match, participant }) => {
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
