import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const theElephant: Trophy = {
  island: 'hub',
  name: 'theElephant',
  level: 'hubTeamwork',
  title: 'The Elephant',
  description: `Do not die for more than 20 minutes.\nARAM: Ten minutes`,
  category: 'teamwork',
  aramSupport: true,
  checkProgress: ({ match, participant }) => {
    const requiredTimelimit = match.queueId === ARAM_HOWLING_ABYSS ? 600 : 1200;
    if (
      !participant.stats.longestTimeSpentLiving &&
      match.gameDuration >= requiredTimelimit
    ) {
      return 1;
    }
    return participant.stats.longestTimeSpentLiving / requiredTimelimit;
  },
  checkLive: ({ events, gameData, account }) => {
    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    );
    const requiredTimelimit = gameData.gameMode === 'ARAM' ? 600 : 1200;
    const lastDeath = deaths[deaths.length - 1];
    if (!lastDeath && gameData.gameTime > requiredTimelimit) {
      return 1;
    }
    if (
      lastDeath &&
      gameData.gameTime - lastDeath.EventTime > requiredTimelimit
    ) {
      return 1;
    }
    return 0;
  },
};

export default theElephant;
