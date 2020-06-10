import { Trophy } from '../types';

const enrage: Trophy = {
  island: 'hubIsland',
  name: 'enrage',
  level: 'hubCombat',
  title: 'Enrage',
  description: 'Score at least three killing sprees.',
  category: 'combat',
  maxProgress: 3,
  checkProgress: ({ match, account }) => {
    const participantIdentity = match.participantIdentities.find(
      (participantIdentity) =>
        participantIdentity.player.accountId === account.summoner.accountId
    );
    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );

    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'enrage'
    );

    const progress =
      participant.stats.killingSprees +
      (existingTrophy ? existingTrophy.progress : 0);
    return Math.min(1, progress / 3);
  },
  checkLive: ({ events, trophyData, account }) => {
    if (trophyData.enrage || events.length === 0) {
      return 0;
    }

    const multiKills = events.filter(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 3
    );
    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'enrage'
    );

    const progress = Math.min(
      1,
      multiKills.length / 3 + (existingTrophy ? existingTrophy.progress : 0)
    );
    if (progress === 1) {
      trophyData.enrage = true;
    }
    return progress;
  },
};

export default enrage;
