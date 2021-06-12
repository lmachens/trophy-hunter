import { Trophy } from '../types';

const jungleOfTraps: Trophy = {
  island: 'teamwork',
  name: 'jungleOfTraps',
  level: 'teamwork7',
  title: 'Jungle Of Traps',
  description:
    'Place at least four control wards, remove four enemy wards, kill two dragons and score a killing spree.',
  category: 'teamwork',
  checkProgress: ({ participant }) => {
    return Number(
      participant.visionWardsBoughtInGame >= 4 &&
        participant.wardsKilled >= 4 &&
        participant.killingSprees >= 1 &&
        participant.dragonKills >= 2
    );
  },
};

export default jungleOfTraps;
