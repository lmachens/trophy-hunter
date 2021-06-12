import { Trophy } from '../types';

const killerInstinct: Trophy = {
  island: 'skills',
  name: 'killerInstinct',
  level: 'skills1',
  title: 'Killer Instinct',
  description: 'Have the highest number of kills.',
  category: 'skills',
  checkProgress: ({ participant, match }) => {
    const maxKills = Math.max(
      ...match.info.participants.map((participant) => participant.kills)
    );

    return Number(participant.kills >= maxKills);
  },
};

export default killerInstinct;
