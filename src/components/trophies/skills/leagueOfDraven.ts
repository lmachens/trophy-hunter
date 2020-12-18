import { Trophy } from '../types';
import { getParticipantKills } from '../../../api/riot/helpers';

const leagueOfDraven: Trophy = {
  island: 'skills',
  name: 'leagueOfDraven',
  level: 'skills6',
  title: 'League Of Draven',
  description:
    'Win a game where all of your teammates assisted you at least as many kills as they killed themselves.',
  category: 'skills',
  checkProgress: ({ match, events, participant }) => {
    const kills = getParticipantKills(events, participant.participantId);
    const teammates = match.participants.filter(
      (other) =>
        other.participantId !== participant.participantId &&
        other.teamId === participant.teamId
    );

    const moreAssistsThanKills = teammates.every((teammate) => {
      const assistsToParticipant = kills.filter((kill) =>
        kill.assistingParticipantIds.includes(teammate.participantId)
      ).length;
      return teammate.stats.kills <= assistsToParticipant;
    });
    return Number(moreAssistsThanKills);
  },
};

export default leagueOfDraven;
