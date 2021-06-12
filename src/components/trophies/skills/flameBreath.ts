import { Trophy } from '../types';

const flameBreath: Trophy = {
  island: 'skills',
  name: 'flameBreath',
  level: 'skills5',
  title: 'Flame Breath',
  description: 'Have highest cs score in the game as a jungler.',
  category: 'skills',
  checkProgress: ({ match, participant }) => {
    if (participant.lane !== 'JUNGLE') {
      return 0;
    }

    const others = match.info.participants.filter(
      (other) => other.participantId !== participant.participantId
    );

    const ownCS =
      participant.totalMinionsKilled + participant.neutralMinionsKilled;

    const otherCSMax = Math.max(
      ...others.map(
        (other) => other.totalMinionsKilled + other.neutralMinionsKilled
      )
    );

    return Number(ownCS > otherCSMax);
  },
};

export default flameBreath;
