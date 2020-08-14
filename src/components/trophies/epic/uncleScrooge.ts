import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const uncleScrooge: Trophy = {
  island: 'epicIsland',
  name: 'uncleScrooge',
  level: 'epic2',
  title: 'Uncle Scrooge',
  description: 'Gain more than 28000 gold.',
  category: 'epic',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    return participant.stats.goldEarned / 28000;
  },
  checkLive: ({ activePlayer }) => {
    return activePlayer.currentGold / 28000;
  },
};

export default uncleScrooge;
