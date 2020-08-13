import { Trophy } from '../types';
import {
  getParticipantByAccount,
  getOpponents,
} from '../../../api/riot/helpers';

const thePirate: Trophy = {
  island: 'epicIsland',
  name: 'thePirate',
  level: 'epic2',
  title: 'The Pirate',
  description:
    'Secure Baron Nashor eventhough two of your teammates died in the last 40 seconds.',
  category: 'epic',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    const participantBaronKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'BARON_NASHOR' &&
        event.killerId === participant.participantId
    );
    const opponentIds = getOpponents(match, participant).map(
      (opponent) => opponent.participantId
    );
    const opponentKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' && opponentIds.includes(event.killerId)
    );

    const teamDeathsBeforeBaron = participantBaronKills.map((baronKill) =>
      opponentKills.filter(
        (kill) =>
          baronKill.timestamp > kill.timestamp &&
          baronKill.timestamp <= kill.timestamp + 40000
      )
    );

    const pirateScore = Math.max(
      0,
      Math.max(...teamDeathsBeforeBaron.map((deaths) => deaths.length))
    );

    return pirateScore / 2;
  },
};

export default thePirate;
