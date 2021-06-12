import { Trophy } from '../types';

const firstBlood: Trophy = {
  island: 'combat',
  name: 'firstBlood',
  level: 'combat1',
  title: 'First Blood',
  description: 'Take first blood.',
  category: 'combat',
  checkProgress: ({ participant }) => {
    return Number(participant.firstBloodKill);
  },
  checkLive: ({ events, account }) => {
    const firstKill = events.find(
      (event) => event.EventName === 'ChampionKill'
    );

    const firstBloodKill =
      firstKill && firstKill.KillerName === account.summoner.name;

    return Number(firstBloodKill);
  },
};

export default firstBlood;
