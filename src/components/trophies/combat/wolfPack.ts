import { Trophy } from '../types';
import { getParticipantKillsAndAssists } from '../../../api/riot/helpers';

const wolfPack: Trophy = {
  island: 'combat',
  name: 'wolfPack',
  level: 'combat6',
  title: 'Wolf Pack',
  description:
    'Participate in a kill in the enemy jungle in the first ten minutes.',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const wolfPackKills = killsAndAssists.filter((kill) => {
      const notMid = Math.abs(kill.position.x - kill.position.y) < 1000;
      let beyondTheRiver;
      let xInJungle;
      let yInJungle;

      if (participant.teamId === 100) {
        beyondTheRiver = kill.position.x + kill.position.y > 16600;
        xInJungle = kill.position.x < 13000;
        yInJungle = kill.position.y < 13000;
      } else {
        beyondTheRiver = kill.position.x + kill.position.y < 13000;
        xInJungle = kill.position.x > 1880;
        yInJungle = kill.position.y > 1880;
      }
      return (
        beyondTheRiver &&
        xInJungle &&
        yInJungle &&
        notMid &&
        kill.timestamp < 600000
      );
    }).length;

    return wolfPackKills;
  },
};

export default wolfPack;
