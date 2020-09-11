import { Trophy } from '../types';

const theElephant: Trophy = {
  island: 'hubIsland',
  name: 'theElephant',
  level: 'hubTeamwork',
  title: 'The Elephant',
  description: 'Do not die for more than 20 minutes.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
    if (
      !participant.stats.longestTimeSpentLiving &&
      match.gameDuration >= 1200
    ) {
      return 1;
    }

    return participant.stats.longestTimeSpentLiving / 1200;
  },
  checkLive: ({ events, trophyData, gameData, account }) => {
    if (!events.length) {
      return 0;
    }

    if (!trophyData.theElephant) {
      trophyData.theElephant = {
        deaths: 0,
        aliveSince: 0,
        achieved: false,
      } as TheElephantTrophyData;
    }
    if (trophyData.theElephant.achieved) {
      return 0;
    }

    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    ).length;

    if (deaths > trophyData.theElephant.deaths) {
      trophyData.theElephant = {
        deaths,
        aliveSince: gameData.gameTime,
        achieved: false,
      } as TheElephantTrophyData;
      return 0;
    }

    const aliveFor = gameData.gameTime - trophyData.theElephant.aliveSince;
    const progress = Math.min(1, aliveFor / 1200);
    if (progress === 1) {
      trophyData.theElephant.achieved = true;
    }
    return progress;
  },
};

interface TheElephantTrophyData {
  deaths: number;
  aliveSince: number;
  achieved: boolean;
}
export default theElephant;
