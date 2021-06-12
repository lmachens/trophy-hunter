import { Trophy } from '../types';

const visionGame: Trophy = {
  island: 'teamwork',
  name: 'visionGame',
  level: 'teamwork8',
  title: 'Vision Game',
  description:
    'Place at least four control wards, Clear at least four wards and place at least 20 wards.',
  category: 'teamwork',
  checkProgress: ({ participant }) => {
    return Number(
      participant.visionWardsBoughtInGame >= 4 &&
        participant.wardsPlaced >= 20 &&
        participant.wardsKilled >= 4
    );
  },
};

export default visionGame;
