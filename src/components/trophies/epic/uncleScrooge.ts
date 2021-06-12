import { Trophy } from '../types';

const uncleScrooge: Trophy = {
  island: 'epic',
  name: 'uncleScrooge',
  level: 'epic2',
  title: 'Uncle Scrooge',
  description: 'Gain more than 28000 gold.',
  category: 'epic',
  checkProgress: ({ participant }) => {
    return participant.goldEarned / 28000;
  },
  checkLive: ({ activePlayer }) => {
    return activePlayer.currentGold / 28000;
  },
};

export default uncleScrooge;
