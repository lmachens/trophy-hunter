import { Trophy } from '../types';

const theTortoise: Trophy = {
  island: 'epicIsland',
  name: 'theTortoise',
  level: 'epic2',
  title: 'The Tortoise',
  description: 'Do not die for more than 30 minutes.',
  category: 'epic',
  checkProgress: ({ match, participant }) => {
    if (
      !participant.stats.longestTimeSpentLiving &&
      match.gameDuration >= 1800
    ) {
      return 1;
    }

    return participant.stats.longestTimeSpentLiving / 1800;
  },
  checkLive: ({ events, gameData, account }) => {
    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    );

    const lastDeath = deaths[deaths.length - 1];
    if (!lastDeath && gameData.gameTime > 1800) {
      return 1;
    }
    if (lastDeath && gameData.gameTime - lastDeath.EventTime > 1800) {
      return 1;
    }
    return 0;
  },
};

export default theTortoise;
