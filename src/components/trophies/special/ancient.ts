import { Trophy } from '../types';

const ancient: Trophy = {
  island: 'specialIsland',
  name: 'ancient',
  level: 'special4',
  title: 'Ancient',
  description: 'Play 500 matches with the trophy hunter app.',
  category: 'special',
  maxProgress: 500,
  checkProgress: ({ account }) => {
    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'ancient'
    );
    const progress = 1 + (existingTrophy ? existingTrophy.progress : 0);
    return Math.min(1, progress / 500);
  },
};

export default ancient;
