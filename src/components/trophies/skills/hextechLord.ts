import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const hextechLord: Trophy = {
  island: 'skillsIsland',
  name: 'hextechLord',
  level: 'skills1',
  title: 'Hextech Lord',
  description: 'Gain more than 15000 gold.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return participant.stats.goldEarned / 15000;
  },
  checkLive: ({ activePlayer }) => {
    if (!activePlayer) {
      return 0;
    }

    return activePlayer.currentGold / 15000;
  },
};

export default hextechLord;
