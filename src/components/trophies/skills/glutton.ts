import { Trophy } from '../types';

const glutton: Trophy = {
  island: 'skillsIsland',
  name: 'glutton',
  level: 'skills5',
  title: 'Glutton',
  description:
    'Nom nom nom nom nom nom nom! Have most kills and most farm in the game.',
  category: 'skills',
  checkProgress: ({ match, participant }) => {
    const maxKills = Math.max(
      ...match.participants.map((participant) => participant.stats.kills)
    );

    const maxTotalMinionsKilled = Math.max(
      ...match.participants.map(
        (participant) =>
          participant.stats.totalMinionsKilled +
          participant.stats.neutralMinionsKilled
      )
    );

    return Number(
      participant.stats.kills >= maxKills &&
        participant.stats.totalMinionsKilled +
          participant.stats.neutralMinionsKilled >=
          maxTotalMinionsKilled
    );
  },
};

export default glutton;
