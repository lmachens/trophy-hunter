import { Trophy } from '../types';

const theViking: Trophy = {
  island: 'hubIsland',
  name: 'theViking',
  level: 'hubObjectives',
  title: 'The Viking',
  description:
    'Get a solo kill before 10 minutes and take down or assist first tower.',
  category: 'objectives',
  checkProgress: ({ events, participant }) => {
    const hasSoloKillBefore10 = events.some(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.assistingParticipantIds.length === 0 &&
        event.timestamp <= 600000
    );

    if (
      !hasSoloKillBefore10 ||
      (!participant.stats.firstTowerKill && !participant.stats.firstTowerAssist)
    ) {
      return 0;
    }
    return 1;
  },
  checkLive: ({ events, gameData, account, trophyData }) => {
    if (!events.length || gameData.gameTime >= 600 || trophyData.theViking) {
      return 0;
    }

    const hasSoloKill = events.find(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.Assisters.length === 0
    );

    const firstTowerKilled = events
      .filter((event) => event.EventName === 'TurretKilled')
      .sort((a, b) => a.EventTime - b.EventTime)[0];
    const firstTowerParticipation =
      firstTowerKilled?.KillerName === account.summoner.name ||
      firstTowerKilled?.Assisters.includes(account.summoner.name);

    if (!hasSoloKill && !firstTowerParticipation) {
      return 0;
    }
    if (
      (hasSoloKill && !firstTowerParticipation) ||
      (!hasSoloKill && firstTowerParticipation)
    ) {
      return 0.5;
    }
    trophyData.theViking = true;
    return 1;
  },
};

export default theViking;
