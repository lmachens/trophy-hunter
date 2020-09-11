import { Trophy } from '../types';

const guardianAngel: Trophy = {
  island: 'teamworkIsland',
  name: 'guardianAngel',
  level: 'teamwork6',
  title: 'Guardian Angel',
  description:
    'Heal 15000 (total) damage to 5 players, score 12 assists and place 18 wards.',
  category: 'teamwork',
  checkProgress: ({ participant }) => {
    return Number(
      participant.stats.totalHeal >= 15000 &&
        participant.stats.totalUnitsHealed >= 5 &&
        participant.stats.wardsPlaced >= 18 &&
        participant.stats.assists >= 12
    );
  },
};

export default guardianAngel;
