import { Trophy } from '../types';

const flameBreath: Trophy = {
  island: 'skillsIsland',
  name: 'flameBreath',
  level: 'skills5',
  title: 'Flame Breath',
  description: 'Have highest cs score in the game as a jungler.',
  category: 'skills',
  checkProgress: ({ match, participant }) => {
    if (participant.timeline.lane !== 'JUNGLE') {
      return 0;
    }

    const others = match.participants.filter(
      (other) => other.participantId !== participant.participantId
    );

    const ownCS =
      participant.stats.totalMinionsKilled +
      participant.stats.neutralMinionsKilled;

    const otherCSMax = Math.max(
      ...others.map(
        (other) =>
          other.stats.totalMinionsKilled + other.stats.neutralMinionsKilled
      )
    );

    return Number(ownCS > otherCSMax);
  },
};

export default flameBreath;
