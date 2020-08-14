import { Trophy } from '../types';
import {
  getParticipantByAccount,
  getTeam,
  getParticipantKills,
} from '../../../api/riot/helpers';

const unlockTheBeast: Trophy = {
  island: 'objectivesIsland',
  name: 'unlockTheBeast',
  level: 'objectives6',
  title: 'Unlock The Beast',
  description:
    'Score two kills in the 40 seconds before your team takes baron nashor.',
  category: 'objectives',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    const teamIds = getTeam(match, participant.teamId).map(
      (teammate) => teammate.participantId
    );

    const baronKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'BARON_NASHOR' &&
        teamIds.includes(event.killerId)
    );
    const kills = getParticipantKills(events, participant.participantId);
    const participantKillsBeforeBaron = baronKills.map((baron) =>
      kills.filter(
        (kill) =>
          baron.timestamp > kill.timestamp &&
          baron.timestamp <= kill.timestamp + 40000
      )
    );

    const unlockTheBeastScore = Math.max(
      ...participantKillsBeforeBaron.map((kills) => kills.length)
    );

    return unlockTheBeastScore / 2;
  },
};

export default unlockTheBeast;
