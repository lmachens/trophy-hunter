import { Trophy } from '../types';

const carryMode: Trophy = {
  island: 'skills',
  name: 'carryMode',
  level: 'skills5',
  title: 'Carry Mode',
  description: 'Win a game where you have more than half of your teams kills.',
  category: 'skills',
  checkProgress: ({ match, participant }) => {
    const team = match.teams.find((team) => team.teamId === participant.teamId);
    const teammates = match.participants.filter(
      (other) =>
        other.teamId === participant.teamId &&
        other.participantId !== participant.participantId
    );

    const teamKills = teammates
      .map((participant) => participant.stats.kills)
      .reduce((current, kills) => current + kills);
    return Number(
      participant.stats.kills > teamKills / 2 && team.win === 'Win'
    );
  },
};

export default carryMode;
