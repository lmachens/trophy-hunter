import { Trophy } from '../types';
import { getParticipantKillsAndAssists } from '../../../api/riot/helpers';

const zenithBlade: Trophy = {
  island: 'teamwork',
  name: 'zenithBlade',
  level: 'teamwork5',
  title: 'Zenith Blade',
  description:
    'Participate in a kill between the two and four minute mark on Summoners Rift.',
  category: 'teamwork',
  checkProgress: ({ participant, events }) => {
    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const zenithBladeKills = killsAndAssists.filter((kill) => {
      const isEarlyEnough = kill.timestamp <= 4 * 60 * 1000;
      const isLateEnough = kill.timestamp >= 2 * 60 * 1000;
      return isLateEnough && isEarlyEnough;
    }).length;
    return zenithBladeKills;
  },
};

export default zenithBlade;
