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
  checkLive: ({ events, gameData, account }) => {
    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    );

    const lastDeath = deaths[deaths.length - 1];
    if (!lastDeath && gameData.gameTime > 1200) {
      return 1;
    }
    if (gameData.gameTime - lastDeath.EventTime > 1200) {
      return 1;
    }
    return 0;
  },
};

export default theElephant;
