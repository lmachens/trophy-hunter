import { Trophy } from '../types';
import ObjectivesProgress from '../objectives/ObjectivesProgress';

const theViking: Trophy = {
  island: 'hubIsland',
  name: 'theViking',
  level: 'hubObjectives',
  title: 'The Viking',
  description:
    'Get a solo kill before 10 minutes and take down or assist first tower.',
  ProgressIcon: ObjectivesProgress,
  checkProgress: ({ match, timeline, account }) => {
    const participantIdentity = match.participantIdentities.find(
      (participantIdentity) =>
        participantIdentity.player.accountId === account.summoner.accountId
    );
    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );

    const hasSoloKills = timeline.frames.find((frame) =>
      frame.events.filter(
        (event) =>
          event.type === 'CHAMPION_KILL' &&
          event.killerId === participant.participantId &&
          event.assistingParticipantIds.length === 0
      )
    );

    const firstTowerParticipation =
      participant.stats.firstTowerKill || participant.stats.firstTowerAssist;

    return Number(hasSoloKills && firstTowerParticipation);
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
