import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const billGates: Trophy = {
  island: 'skillsIsland',
  name: 'billGates',
  level: 'skills3',
  title: 'Bill Gates',
  description: 'Gain more than 20000 gold.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return participant.stats.goldEarned / 20000;
  },
  checkLive: ({ activePlayer }) => {
    if (!activePlayer) {
      return 0;
    }

    return activePlayer.currentGold / 20000;
  },
};

export default billGates;
