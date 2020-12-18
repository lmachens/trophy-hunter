import { Trophy } from '../types';

const myJungle: Trophy = {
  island: 'skills',
  name: 'myJungle',
  level: 'skills2',
  title: 'My Jungle',
  description: 'Kill most team jungle creeps and most enemy jungle creeps.',
  category: 'skills',
  checkProgress: ({ match, participant }) => {
    const maxEnemyJungleCsOthers = Math.max(
      ...match.participants.map((participant) => participant.stats.kills)
    );
    const maxTeamJungleCsOthers = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.neutralMinionsKilledTeamJungle
      )
    );

    return Number(
      participant.stats.neutralMinionsKilledEnemyJungle >=
        maxEnemyJungleCsOthers &&
        participant.stats.neutralMinionsKilledTeamJungle >=
          maxTeamJungleCsOthers
    );
  },
};

export default myJungle;
