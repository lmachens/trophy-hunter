import { Trophy } from '../types';

const lastResort: Trophy = {
  island: 'teamworkIsland',
  name: 'lastResort',
  level: 'teamwork6',
  title: 'Last Resort',
  description:
    'You lost, but you have highest kill participation and least deaths on your team.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
    const team = match.teams.find((team) => team.teamId === participant.teamId);
    const teammates = match.participants.filter(
      (other) =>
        other.participantId !== participant.participantId &&
        other.teamId === team.teamId
    );

    const minTeamDeaths = Math.min(
      ...teammates.map((participant) => participant.stats.deaths)
    );

    const maxKillParticipation = Math.max(
      ...teammates.map(
        (participant) => participant.stats.kills + participant.stats.assists
      )
    );

    const hasMinDeaths = participant.stats.deaths <= minTeamDeaths;
    const hasHighesKillParticipation =
      participant.stats.kills + participant.stats.assists >=
      maxKillParticipation;
    const isLoser = team.win === 'Fail';
    return Number(hasMinDeaths && hasHighesKillParticipation && isLoser);
  },
};

export default lastResort;
