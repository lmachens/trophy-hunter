import { Trophy } from '../types';
import { getParticipantIdentity } from '../../../api/riot/helpers';

const darkness: Trophy = {
  island: 'hubIsland',
  name: 'darkness',
  level: 'hubEpic',
  title: 'Darkness',
  description: 'Destroy at least twelve enemy wards.',
  category: 'epic',
  maxProgress: 12,
  checkProgress: ({ match, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );

    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'darkness'
    );
    const progress =
      participant.stats.wardsKilled +
      (existingTrophy ? existingTrophy.progress : 0);
    return Math.min(1, progress / 12);
  },
};

export default darkness;
