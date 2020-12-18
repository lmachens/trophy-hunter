import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const theGoblin: Trophy = {
  island: 'skills',
  name: 'theGoblin',
  level: 'skills6',
  title: 'The Goblin',
  description: 'Have most own & enemy jungle cs three times in a row.',
  category: 'skills',
  maxProgress: 3,
  checkProgress: ({ match, participant, account }) => {
    const maxEnemyJungleCsOthers = Math.max(
      ...match.participants.map((participant) => participant.stats.kills)
    );
    const maxTeamJungleCsOthers = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.neutralMinionsKilledTeamJungle
      )
    );
    const mostJungleCS =
      participant.stats.neutralMinionsKilledEnemyJungle >=
        maxEnemyJungleCsOthers &&
      participant.stats.neutralMinionsKilledTeamJungle >= maxTeamJungleCsOthers;
    if (!mostJungleCS) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'theGoblin');
    return Number(mostJungleCS) / 3 + trophyProgress;
  },
};

export default theGoblin;
