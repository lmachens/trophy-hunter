import { Trophy } from '../types';

const sniper: Trophy = {
  island: 'combat',
  name: 'sniper',
  level: 'combat8',
  title: 'Sniper',
  description:
    'Have most damage dealt to champions while taking the least damage.',
  category: 'combat',
  checkProgress: ({ match, participant }) => {
    const maxTotalDamageDealtToChampions = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.totalDamageDealtToChampions
      )
    );
    const minTotalDamageTaken = Math.min(
      ...match.participants.map(
        (participant) => participant.stats.totalDamageTaken
      )
    );

    return Number(
      participant.stats.totalDamageDealtToChampions >=
        maxTotalDamageDealtToChampions &&
        participant.stats.totalDamageTaken === minTotalDamageTaken
    );
  },
};

export default sniper;
