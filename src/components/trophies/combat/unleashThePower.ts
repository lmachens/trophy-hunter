import { Trophy } from '../types';
import { getLevelUps, getParticipantKills } from '../../../api/riot/helpers';

const unleashThePower: Trophy = {
  island: 'combat',
  name: 'unleashThePower',
  level: 'combat4',
  title: 'Unleash The Power',
  description: 'Achieve a kill in the 30 seconds after you reached level six.',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    const levelUps = getLevelUps(events, participant.participantId);
    const levelSix = levelUps[5];
    if (!levelSix) {
      return 0;
    }
    const kills = getParticipantKills(events, participant.participantId);

    const hasKillInTimeframe = kills.some(
      (kill) =>
        kill.timestamp > levelSix.timestamp &&
        kill.timestamp - 30000 < levelSix.timestamp
    );

    return Number(hasKillInTimeframe);
  },
  checkLive: ({ events, activePlayer, gameData, trophyData, account }) => {
    if (!trophyData.unleashThePower && activePlayer.level === 6) {
      trophyData.unleashThePower = gameData.gameTime;
    }

    if (!trophyData.unleashThePower) {
      return 0;
    }

    const hasKillInTimeframe = events.some(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.EventTime > trophyData.unleashThePower &&
        event.EventTime + 30 < trophyData.unleashThePower
    );

    return Number(hasKillInTimeframe);
  },
};

export default unleashThePower;
