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
      ...match.info.participants.map(
        (participant) => participant.totalDamageDealtToChampions
      )
    );
    const minTotalDamageTaken = Math.min(
      ...match.info.participants.map(
        (participant) => participant.totalDamageTaken
      )
    );

    return Number(
      participant.totalDamageDealtToChampions >=
        maxTotalDamageDealtToChampions &&
        participant.totalDamageTaken === minTotalDamageTaken
    );
  },
};

export default sniper;
