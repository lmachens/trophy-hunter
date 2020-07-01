import { Trophy } from '../types';

const greenhorn: Trophy = {
  island: 'hubIsland',
  name: 'greenhorn',
  level: 'hubSpecial',
  title: 'Greenhorn',
  description: 'Play ten matches with the trophy hunter app.',
  category: 'special',
  maxProgress: 10,
  checkProgress: ({ account }) => {
    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'greenhorn'
    );
    const progress = 1 + (existingTrophy ? existingTrophy.progress : 0);
    return progress / 10;
  },
};

export default greenhorn;
