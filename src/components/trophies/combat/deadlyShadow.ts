import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const deadlyShadow: Trophy = {
  island: 'combatIsland',
  name: 'deadlyShadow',
  level: 'combat6',
  title: 'Deadly Shadow',
  description: 'Have most kills while taking least damage in the game.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const maxKills = Math.max(
      ...match.participants.map((participant) => participant.stats.kills)
    );
    const minTotalDamageTaken = Math.min(
      ...match.participants.map(
        (participant) => participant.stats.totalDamageTaken
      )
    );

    return Number(
      participant.stats.kills >= maxKills &&
        participant.stats.totalDamageTaken === minTotalDamageTaken
    );
  },
};

export default deadlyShadow;
