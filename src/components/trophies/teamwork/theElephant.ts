import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { minutesToSeconds } from '../../../api/utils/dates';
import { Trophy } from '../types';

const SUMMONERS_RIFT_MINUTES = 19;
const ARAM_MINUTES = 9;

const theElephant: Trophy = {
  island: 'hub',
  name: 'theElephant',
  level: 'hubTeamwork',
  title: 'The Elephant',
  description: `Do not die for more than ${SUMMONERS_RIFT_MINUTES} minutes.\nARAM: ${ARAM_MINUTES} minutes`,
  category: 'teamwork',
  aramSupport: true,
  checkProgress: ({ match, participant }) => {
    const requiredTimelimit =
      match.info.queueId === ARAM_HOWLING_ABYSS
        ? minutesToSeconds(ARAM_MINUTES)
        : minutesToSeconds(SUMMONERS_RIFT_MINUTES);
    if (
      !participant.longestTimeSpentLiving &&
      match.info.gameDuration >= requiredTimelimit
    ) {
      return 1;
    }
    return participant.longestTimeSpentLiving / requiredTimelimit;
  },
  checkLive: ({ events, gameData, account }) => {
    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    );
    const requiredTimelimit =
      gameData.gameMode === 'ARAM'
        ? minutesToSeconds(ARAM_MINUTES)
        : minutesToSeconds(SUMMONERS_RIFT_MINUTES);
    const lastDeath = deaths[deaths.length - 1];
    if (!lastDeath) {
      return gameData.gameTime / requiredTimelimit;
    }
    return (gameData.gameTime - lastDeath.EventTime) / requiredTimelimit;
  },
};

export default theElephant;
