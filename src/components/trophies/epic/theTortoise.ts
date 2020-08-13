import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const theTortoise: Trophy = {
  island: 'epicIsland',
  name: 'theTortoise',
  level: 'epic2',
  title: 'The Tortoise',
  description: 'Do not die for more than 30 minutes.',
  category: 'epic',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    if (!participant.stats.longestTimeSpentLiving) {
      return 1;
    }

    return participant.stats.longestTimeSpentLiving / 1800;
  },
  checkLive: ({ events, trophyData, gameData, account }) => {
    if (!events.length) {
      return 0;
    }

    if (!trophyData.theTortoise) {
      trophyData.theTortoise = {
        deaths: 0,
        aliveSince: 0,
        achieved: false,
      } as TheTortoiseTrophyData;
    }
    if (trophyData.theTortoise.achieved) {
      return 0;
    }

    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    ).length;

    if (deaths > trophyData.theTortoise.deaths) {
      trophyData.theTortoise = {
        deaths,
        aliveSince: gameData.gameTime,
        achieved: false,
      } as TheTortoiseTrophyData;
      return 0;
    }

    const aliveFor = gameData.gameTime - trophyData.theTortoise.aliveSince;
    const progress = Math.min(1, aliveFor / 1800);
    if (progress === 1) {
      trophyData.theTortoise.achieved = true;
    }
    return progress;
  },
};

interface TheTortoiseTrophyData {
  deaths: number;
  aliveSince: number;
  achieved: boolean;
}

export default theTortoise;
