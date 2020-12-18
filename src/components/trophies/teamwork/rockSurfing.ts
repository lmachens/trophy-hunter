import { Trophy } from '../types';
import { getParticipantKillsAndAssists } from '../../../api/riot/helpers';

const rockSurfing: Trophy = {
  island: 'teamwork',
  name: 'rockSurfing',
  level: 'teamwork8',
  title: 'Rock Surfing',
  description:
    'Participate in two kills on bottom lane before 10 minutes as a midlaner.',
  category: 'teamwork',
  checkProgress: ({ events, participant }) => {
    if (
      participant.timeline.lane !== 'MIDDLE' ||
      participant.timeline.role !== 'SOLO'
    ) {
      return 0;
    }

    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const rockSurfingKills = killsAndAssists.filter((kill) => {
      const isOnBotlane =
        kill.position.x - kill.position.y >= 8000 ||
        kill.position.x >= 13000 ||
        kill.position.y <= 2000;
      const isEarlyEnough = kill.timestamp <= 10 * 60 * 1000;
      return isOnBotlane && isEarlyEnough;
    }).length;

    return Number(rockSurfingKills >= 2);
  },
};

export default rockSurfing;
