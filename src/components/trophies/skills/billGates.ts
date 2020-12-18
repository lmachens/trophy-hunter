import { Trophy } from '../types';

const billGates: Trophy = {
  island: 'skills',
  name: 'billGates',
  level: 'skills3',
  title: 'Bill Gates',
  description: 'Gain more than 20000 gold.',
  category: 'skills',
  checkProgress: ({ participant }) => {
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
