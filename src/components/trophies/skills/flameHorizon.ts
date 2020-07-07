import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const flameHorizon: Trophy = {
  island: 'skillsIsland',
  name: 'flameHorizon',
  level: 'skills3',
  title: 'Flame Breath',
  description: 'Kill at least 100 more minions than your lane opponent.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const otherTeamParticipants = match.participants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.teamId === participant.teamId
    );

    const laneOpponents = otherTeamParticipants.filter(
      (teammate) =>
        teammate.timeline.lane === participant.timeline.lane &&
        teammate.timeline.role === participant.timeline.role &&
        'JUNGLE' !== participant.timeline.lane &&
        'DUO_SUPPORT' !== participant.timeline.role
    );

    if (laneOpponents.length === 1) {
      const laneOpponent = laneOpponents[0];
      return (
        (participant.stats.totalMinionsKilled +
          participant.stats.neutralMinionsKilled) /
        (laneOpponent.stats.totalMinionsKilled +
          laneOpponent.stats.neutralMinionsKilled +
          100)
      );
    } else if (laneOpponents.length === 2) {
      // this can happen on botlane if the system doesnt understand who is adc and who is support
      const laneOpponent1CS =
        laneOpponents[0].stats.totalMinionsKilled +
        laneOpponents[0].stats.neutralMinionsKilled;
      const laneOpponent2CS =
        laneOpponents[1].stats.totalMinionsKilled +
        laneOpponents[1].stats.neutralMinionsKilled;
      const laneOpponentMaxCs =
        laneOpponent1CS > laneOpponent2CS ? laneOpponent1CS : laneOpponent2CS;
      return (
        (participant.stats.totalMinionsKilled +
          participant.stats.neutralMinionsKilled) /
        (laneOpponentMaxCs + 100)
      );
    }
    return 0;
  },
};

export default flameHorizon;
