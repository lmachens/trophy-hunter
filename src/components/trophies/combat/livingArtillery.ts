import { Trophy } from '../types';
import { getTeammates } from '../../../api/riot/helpers';

const livingArtillery: Trophy = {
  island: 'combatIsland',
  name: 'livingArtillery',
  level: 'combat5',
  title: 'Living Artillery',
  description: "Deal more than 35% of your team's damage.",
  category: 'combat',
  checkProgress: ({ match, participant }) => {
    const teammates = getTeammates(match, participant);

    const teammatesDamage = teammates.reduce(
      (current, teammate) =>
        current + teammate.stats.totalDamageDealtToChampions,
      0
    );

    const damageShare =
      participant.stats.totalDamageDealtToChampions / teammatesDamage;
    return damageShare / 0.35;
  },
};

export default livingArtillery;
