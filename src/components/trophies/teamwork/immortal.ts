import { Trophy } from '../types';

const immortal: Trophy = {
  island: 'teamworkIsland',
  name: 'immortal',
  level: 'teamwork7',
  title: 'Immortal',
  description: 'Win a game that lasts 25 minutes or more without dying.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
    return Number(
      participant.stats.deaths < 1 &&
        match.gameDuration >= 1500 &&
        participant.stats.win
    );
  },
};

export default immortal;
