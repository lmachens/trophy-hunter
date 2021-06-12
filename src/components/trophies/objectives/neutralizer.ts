import { Trophy } from '../types';
import { getParticipantKillsAndAssists } from '../../../api/riot/helpers';

const neutralizer: Trophy = {
  island: 'objectives',
  name: 'neutralizer',
  level: 'objectives1',
  title: 'Neutralizer',
  description:
    'Participate in clearing three baron buffs from the opposing team (kill an opponent with baron buff).',
  category: 'objectives',
  checkProgress: ({ match, events, participant }) => {
    const opponentTeamIds = match.info.participants
      .filter((other) => other.teamId !== participant.teamId)
      .map((other) => other.participantId);

    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const opponentBaronKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'BARON_NASHOR' &&
        opponentTeamIds.includes(event.killerId)
    );

    const baronClearParticipations = killsAndAssists.filter((kill) =>
      opponentBaronKills.some(
        (baronKill) =>
          baronKill.timestamp < kill.timestamp &&
          kill.timestamp < baronKill.timestamp + 210000
      )
    ).length;

    return baronClearParticipations / 3;
  },
};

export default neutralizer;
