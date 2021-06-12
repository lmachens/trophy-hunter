import { Trophy } from '../types';

const guardianAngel: Trophy = {
  island: 'teamwork',
  name: 'guardianAngel',
  level: 'teamwork6',
  title: 'Guardian Angel',
  description:
    'Heal 15000 (total) damage to 5 players, score 12 assists and place 18 wards.',
  category: 'teamwork',
  checkProgress: ({ participant }) => {
    return Number(
      participant.totalHeal >= 15000 &&
        participant.totalUnitsHealed >= 5 &&
        participant.wardsPlaced >= 18 &&
        participant.assists >= 12
    );
  },
};

export default guardianAngel;
