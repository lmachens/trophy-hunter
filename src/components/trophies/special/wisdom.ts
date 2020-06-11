import { Trophy } from '../types';

const wisdom: Trophy = {
  island: 'specialIsland',
  name: 'wisdom',
  level: 'special4',
  title: 'Wisdom',
  description: 'Play 100 matches with the trophy hunter app.',
  category: 'special',
  maxProgress: 100,
  checkProgress: ({ account }) => {
    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'wisdom'
    );
    const progress = 1 + (existingTrophy ? existingTrophy.progress : 0);
    return Math.min(1, progress / 100);
  },
};

export default wisdom;
