import { Trophy } from '../types';

const octopus: Trophy = {
  island: 'teamwork',
  name: 'octopus',
  level: 'teamwork1',
  title: 'Octopus',
  description: 'Have most assists.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
    const maxAssists = Math.max(
      ...match.info.participants.map((other) => other.assists)
    );

    return Number(participant.assists >= maxAssists);
  },
};

export default octopus;
