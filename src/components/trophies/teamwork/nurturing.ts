import { Trophy } from '../types';
import {
  getParticipantAssists,
  getTeammates,
  getOtherParticipants,
} from '../../../api/riot/helpers';

const nurturing: Trophy = {
  island: 'teamwork',
  name: 'nurturing',
  level: 'teamwork7',
  title: 'Nurturing',
  description:
    'Feed them when they are small. One of your teammates has most kills and damage in game. You assisted him three kills pre ten minutes.',
  category: 'teamwork',
  checkProgress: ({ match, events, participant }) => {
    const assists = getParticipantAssists(events, participant.participantId);

    const teammates = getTeammates(match, participant);
    const maxKills = Math.max(
      ...match.participants.map((participant) => participant.stats.kills)
    );

    const fedTeammate = teammates.find((teammate) => {
      const others = getOtherParticipants(match, teammate);
      const maxTotalDamageDealtToChampions = Math.max(
        ...others.map(
          (participant) => participant.stats.totalDamageDealtToChampions
        )
      );

      return (
        teammate.stats.kills >= maxKills &&
        teammate.stats.totalDamageDealtToChampions >=
          maxTotalDamageDealtToChampions
      );
    });
    if (!fedTeammate) {
      return 0;
    }

    const fedTeamMateAssistsPre10 = assists.filter(
      (assist) =>
        assist.timestamp < 10 * 60 * 1000 &&
        assist.killerId === fedTeammate.participantId
    ).length;

    return fedTeamMateAssistsPre10 / 3;
  },
};

export default nurturing;
