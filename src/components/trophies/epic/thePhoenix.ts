import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const thePhoenix: Trophy = {
  island: 'epicIsland',
  name: 'thePhoenix',
  level: 'epic2',
  title: 'The Phoenix',
  description: 'Win a game eventhough you lost three inhibitors.',
  category: 'epic',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    const opponentTeam = match.teams.find(
      (team) => team.teamId !== participant.teamId
    );

    return Number(participant.stats.win && opponentTeam.inhibitorKills >= 3);
  },
};

export default thePhoenix;
