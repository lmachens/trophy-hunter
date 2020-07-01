import { Trophy } from '../types';
import { getParticipantIdentity } from '../../../api/riot/helpers';

const firstBlood: Trophy = {
  island: 'combatIsland',
  name: 'firstBlood',
  level: 'combat1',
  title: 'First Blood',
  description: 'Take first blood.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );
    return Number(participant.stats.firstBloodKill);
  },
  checkLive: ({ allPlayers, trophyData, account }) => {
    if (!allPlayers || trophyData.firstBlood) {
      return 0;
    }

    const killer = allPlayers.find((player) => player.scores.kills > 0);
    if (!killer) {
      return 0;
    }
    trophyData.firstBlood = killer.summonerName;

    return Number(account.summoner.name === trophyData.firstBlood);
  },
};

export default firstBlood;
