import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const killerInstinct: Trophy = {
  island: 'skillsIsland',
  name: 'killerInstinct',
  level: 'skills1',
  title: 'Killer Instinct',
  description: 'Have the highest number of kills.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const maxKills = Math.max(
      ...match.participants.map((participant) => participant.stats.kills)
    );

    return Number(participant.stats.kills >= maxKills);
  },
};

export default killerInstinct;
