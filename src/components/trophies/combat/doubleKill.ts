import { Trophy } from '../types';

const doubleKill: Trophy = {
  island: 'combatIsland',
  name: 'doubleKill',
  level: 'combat1',
  title: 'Double Kill',
  description: 'Achieve a double kill.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participantIdentity = match.participantIdentities.find(
      (participantIdentity) =>
        participantIdentity.player.accountId === account.summoner.accountId
    );
    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );

    return Number(participant.stats.doubleKills >= 1);
  },
  checkLive: ({ events, trophyData, account }) => {
    if (!events.length || trophyData.doubleKill) {
      return 0;
    }

    const doubleKill = events.find(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 2
    );

    if (doubleKill) {
      trophyData.doubleKill = true;
    }

    return Number(doubleKill);
  },
};

export default doubleKill;
