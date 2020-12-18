import { Trophy } from '../types';

const jungleOfTraps: Trophy = {
  island: 'teamwork',
  name: 'jungleOfTraps',
  level: 'teamwork7',
  title: 'Jungle Of Traps',
  description:
    'Place at least four control wards, remove four enemy wards, kill two dragons and score a killing spree.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
    const team = match.teams.find((team) => team.teamId === participant.teamId);

    return Number(
      participant.stats.visionWardsBoughtInGame >= 4 &&
        participant.stats.wardsKilled >= 4 &&
        participant.stats.killingSprees >= 1 &&
        team.dragonKills >= 2
    );
  },
};

export default jungleOfTraps;
