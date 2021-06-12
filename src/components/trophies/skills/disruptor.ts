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
      ...match.info.participants.map(
        (participant) => participant.totalTimeCrowdControlDealt
      )
    );

    return Number(
      participant.totalTimeCrowdControlDealt >= maxTotalTimeCrowdControlDealt
    );
  },
};

export default disruptor;
