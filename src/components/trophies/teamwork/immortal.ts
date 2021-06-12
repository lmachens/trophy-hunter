import { Trophy } from '../types';

const immortal: Trophy = {
  island: 'teamwork',
  name: 'immortal',
  level: 'teamwork7',
  title: 'Immortal',
  description: 'Win a game that lasts 25 minutes or more without dying.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
    return Number(
      participant.deaths < 1 &&
        match.info.gameDuration >= 1500 &&
        participant.win
    );
  },
};

export default immortal;
