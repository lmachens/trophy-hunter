import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const theTortoise: Trophy = {
  island: 'epic',
  name: 'theTortoise',
  level: 'epic2',
  title: 'The Tortoise',
  description: `Do not die for more than 30 minutes.\nARAM: 20 minutes`,
  category: 'epic',
  aramSupport: true,
  checkProgress: ({ match, participant }) => {
    const requiredTimelimit =
      match.queueId === ARAM_HOWLING_ABYSS ? 1200 : 1800;
    if (
      !participant.stats.longestTimeSpentLiving &&
      match.gameDuration >= requiredTimelimit
    ) {
      return 1;
    }

    return participant.stats.longestTimeSpentLiving / requiredTimelimit;
  },
  checkLive: ({ events, gameData, account }) => {
    const requiredTimelimit = gameData.gameMode === 'ARAM' ? 1200 : 1800;

    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    );

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

export default theTortoise;
