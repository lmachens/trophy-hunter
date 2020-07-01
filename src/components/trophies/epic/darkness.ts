import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const darkness: Trophy = {
  island: 'hubIsland',
  name: 'darkness',
  level: 'hubEpic',
  title: 'Darkness',
  description: 'Destroy at least twelve enemy wards.',
  category: 'epic',
  maxProgress: 12,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'darkness'
    );
    const progress =
      participant.stats.wardsKilled +
      (existingTrophy ? existingTrophy.progress : 0);
    return progress / 12;
  },
};

export default darkness;
