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
      match.info.queueId === ARAM_HOWLING_ABYSS ? 1200 : 1800;
    if (
      !participant.longestTimeSpentLiving &&
      match.info.gameDuration >= requiredTimelimit
    ) {
      return 1;
    }

    return participant.longestTimeSpentLiving / requiredTimelimit;
  },
  checkLive: ({ events, gameData, account }) => {
    const requiredTimelimit = gameData.gameMode === 'ARAM' ? 1200 : 1800;

    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    );

    const lastDeath = deaths[deaths.length - 1];
    if (!lastDeath) {
      return gameData.gameTime / requiredTimelimit;
    }
    return (gameData.gameTime - lastDeath.EventTime) / requiredTimelimit;
  },
};

export default theTortoise;
