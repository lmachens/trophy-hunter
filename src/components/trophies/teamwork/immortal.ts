import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const immortal: Trophy = {
  island: 'teamworkIsland',
  name: 'immortal',
  level: 'teamwork7',
  title: 'Immortal',
  description: 'Win a game that lasts 25 minutes or more without dying.',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return Number(
      participant.stats.deaths < 1 &&
        match.gameDuration >= 1500 &&
        participant.stats.win
    );
  },
};

export default immortal;
