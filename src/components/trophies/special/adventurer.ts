import { Trophy } from '../types';

const adventurer: Trophy = {
  island: 'specialIsland',
  name: 'adventurer',
  level: 'special1',
  title: 'Adventurer',
  description: 'Play 30 matches with the trophy hunter app.',
  category: 'special',
  maxProgress: 30,
  checkProgress: ({ account }) => {
    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'adventurer'
    );
    const progress = 1 + (existingTrophy ? existingTrophy.progress : 0);
    return Math.min(1, progress / 30);
  },
};

export default adventurer;
