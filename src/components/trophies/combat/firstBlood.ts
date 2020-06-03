import { Trophy } from '../types';
import CombatProgress from './CombatProgress';

const firstBlood: Trophy = {
  island: 'combatIsland',
  name: 'firstBlood',
  level: 'combat1',
  title: 'First Blood',
  description: 'Take first blood.',
  ProgressIcon: CombatProgress,
  checkProgress: ({ match, account }) => {
    const participantIdentity = match.participantIdentities.find(
      (participantIdentity) =>
        participantIdentity.player.accountId === account.summoner.accountId
    );
    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );
    return Number(participant.stats.firstBloodKill);
  },
  checkLive: ({ activeGame, account }) => {
    if (
      !activeGame.allPlayers ||
      activeGame.trophyData.firstBloodSummonerName
    ) {
      return 0;
    }

    const killer = activeGame.allPlayers.find(
      (player) => player.scores.kills > 0
    );
    if (!killer) {
      return 0;
    }
    activeGame.trophyData.firstBloodSummonerName = killer.summonerName;

    return Number(
      account.summoner.name === activeGame.trophyData.firstBloodSummonerName
    );
  },
};

export default firstBlood;
