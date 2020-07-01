import { Trophy } from '../types';

const experienced: Trophy = {
  island: 'specialIsland',
  name: 'experienced',
  level: 'special2',
  title: 'Experienced',
  description: 'Play 50 matches with the trophy hunter app.',
  category: 'special',
  maxProgress: 50,
  checkProgress: ({ account }) => {
    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'experienced'
    );
    const progress = 1 + (existingTrophy ? existingTrophy.progress : 0);
    return progress / 50;
  },
};

export default experienced;
