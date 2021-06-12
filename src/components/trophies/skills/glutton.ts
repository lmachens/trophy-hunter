import { Trophy } from '../types';

const glutton: Trophy = {
  island: 'skills',
  name: 'glutton',
  level: 'skills5',
  title: 'Glutton',
  description:
    'Nom nom nom nom nom nom nom! Have most kills and most farm in the game.',
  category: 'skills',
  checkProgress: ({ match, participant }) => {
    const maxKills = Math.max(
      ...match.info.participants.map((participant) => participant.kills)
    );

    const maxTotalMinionsKilled = Math.max(
      ...match.info.participants.map(
        (participant) =>
          participant.totalMinionsKilled + participant.neutralMinionsKilled
      )
    );

    return Number(
      participant.kills >= maxKills &&
        participant.totalMinionsKilled + participant.neutralMinionsKilled >=
          maxTotalMinionsKilled
    );
  },
};

export default glutton;
