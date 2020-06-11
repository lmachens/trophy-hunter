import { Trophy } from '../types';

const master: Trophy = {
  island: 'specialIsland',
  name: 'master',
  level: 'special3',
  title: 'Master',
  description: 'Play 200 matches with the trophy hunter app.',
  category: 'special',
  maxProgress: 200,
  checkProgress: ({ account }) => {
    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'master'
    );
    const progress = 1 + (existingTrophy ? existingTrophy.progress : 0);
    return Math.min(1, progress / 200);
  },
};

export default master;
