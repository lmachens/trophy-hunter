import { Trophy } from '../types';
import {
  getParticipantAssists,
  getTeammates,
  getOtherParticipants,
} from '../../../api/riot/helpers';
import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';

const nurturing: Trophy = {
  island: 'teamwork',
  name: 'nurturing',
  level: 'teamwork7',
  title: 'Nurturing',
  description: `Feed them when they are small. One of your teammates has most kills and damage in game. You assisted him three kills pre ten minutes.\nARAM: 7 minutes`,
  category: 'teamwork',
  aramSupport: true,
  checkProgress: ({ match, events, participant }) => {
    const assists = getParticipantAssists(events, participant.participantId);

    const teammates = getTeammates(match, participant);
    const maxKills = Math.max(
      ...match.info.participants.map((participant) => participant.kills)
    );

    const fedTeammate = teammates.find((teammate) => {
      const others = getOtherParticipants(match, teammate);
      const maxTotalDamageDealtToChampions = Math.max(
        ...others.map((participant) => participant.totalDamageDealtToChampions)
      );

      return (
        teammate.kills >= maxKills &&
        teammate.totalDamageDealtToChampions >= maxTotalDamageDealtToChampions
      );
    });
    if (!fedTeammate) {
      return 0;
    }

    const timeLimit =
      match.info.queueId === ARAM_HOWLING_ABYSS
        ? 7 * 60 * 1000
        : 10 * 60 * 1000;
    const fedTeamMateAssistsPre10 = assists.filter(
      (assist) =>
        assist.timestamp < timeLimit &&
        assist.killerId === fedTeammate.participantId
    ).length;

    return fedTeamMateAssistsPre10 / 3;
  },
};

export default nurturing;
