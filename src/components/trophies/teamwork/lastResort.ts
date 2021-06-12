import { Trophy } from '../types';

const lastResort: Trophy = {
  island: 'teamwork',
  name: 'lastResort',
  level: 'teamwork6',
  title: 'Last Resort',
  description:
    'You lost, but you have highest kill participation and least deaths on your team.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
    const team = match.info.teams.find(
      (team) => team.teamId === participant.teamId
    );
    const teammates = match.info.participants.filter(
      (other) =>
        other.participantId !== participant.participantId &&
        other.teamId === team.teamId
    );

    const minTeamDeaths = Math.min(
      ...teammates.map((participant) => participant.deaths)
    );

    const maxKillParticipation = Math.max(
      ...teammates.map((participant) => participant.kills + participant.assists)
    );

    const hasMinDeaths = participant.deaths <= minTeamDeaths;
    const hasHighesKillParticipation =
      participant.kills + participant.assists >= maxKillParticipation;
    return Number(hasMinDeaths && hasHighesKillParticipation && !team.win);
  },
};

export default lastResort;
