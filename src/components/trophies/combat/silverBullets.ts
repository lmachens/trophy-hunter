import { Trophy } from '../types';

const silverBullets: Trophy = {
  island: 'combat',
  name: 'silverBullets',
  level: 'combat4',
  title: 'Silver Bullets',
  description:
    'Deal more physical damage to champions than anyone else total damage to champions.',
  category: 'combat',
  checkProgress: ({ match, participant }) => {
    const others = match.participants.filter(
      (other) => other.participantId !== participant.participantId
    );
    const maxTotalDamageDealtToChampions = Math.max(
      ...others.map((other) => other.stats.totalDamageDealtToChampions)
    );

    return Number(
      participant.stats.physicalDamageDealtToChampions >=
        maxTotalDamageDealtToChampions
    );
  },
};

export default silverBullets;
