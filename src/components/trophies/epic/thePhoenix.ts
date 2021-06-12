import { Trophy } from '../types';

const thePhoenix: Trophy = {
  island: 'epic',
  name: 'thePhoenix',
  level: 'epic2',
  title: 'The Phoenix',
  description: 'Win a game even though you lost three inhibitors.',
  category: 'epic',
  checkProgress: ({ match, participant }) => {
    const opponentTeam = match.info.teams.find(
      (team) => team.teamId !== participant.teamId
    );

    return Number(participant.win && opponentTeam.inhibitorKills >= 3);
  },
};

export default thePhoenix;
