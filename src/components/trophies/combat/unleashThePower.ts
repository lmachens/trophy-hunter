import { Trophy } from '../types';
import { getLevelUps, getParticipantKills } from '../../../api/riot/helpers';
import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';

const unleashThePower: Trophy = {
  island: 'combat',
  name: 'unleashThePower',
  level: 'combat4',
  title: 'Unleash The Power',
  description: `Achieve a kill in the 30 seconds after you reached level six.\nARAM: 20 seconds`,
  category: 'combat',
  aramSupport: true,
  checkProgress: ({ events, participant, match }) => {
    const requiredTimelimt =
      match.queueId === ARAM_HOWLING_ABYSS ? 20000 : 30000;

    const levelUps = getLevelUps(events, participant.participantId);
    const levelSix = levelUps[5];
    if (!levelSix) {
      return 0;
    }
    const kills = getParticipantKills(events, participant.participantId);

    const hasKillInTimeframe = kills.some(
      (kill) =>
        kill.timestamp > levelSix.timestamp &&
        kill.timestamp - requiredTimelimt < levelSix.timestamp
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

    const requiredTimelimt = gameData.gameMode === 'ARAM' ? 20 : 30;
    const hasKillInTimeframe = events.some(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.EventTime > trophyData.unleashThePower &&
        event.EventTime + requiredTimelimt < trophyData.unleashThePower
    );

    return Number(hasKillInTimeframe);
  },
};

export default unleashThePower;
