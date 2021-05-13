import { Trophy } from '../types';

const neverGiveUp: Trophy = {
  island: 'hub',
  name: 'neverGiveUp',
  level: 'hubEpic',
  title: 'Never Give Up',
  description: 'Win a game even though you lost one inhibitor.',
  category: 'epic',
  checkProgress: ({ match, participant }) => {
    const opponentTeam = match.teams.find(
      (team) => team.teamId !== participant.teamId
    );

    return Number(participant.stats.win && opponentTeam.inhibitorKills >= 1);
  },
};

export default neverGiveUp;
