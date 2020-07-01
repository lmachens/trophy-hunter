import { Trophy } from '../types';
import { getParticipantIdentity } from '../../../api/riot/helpers';

const spinningBlades: Trophy = {
  island: 'combatIsland',
  name: 'spinningBlades',
  level: 'combat2',
  title: 'Spinning Blades',
  description: 'Deal more than 1500 damage with Press The Attack (rune).',
  category: 'combat',
  maxProgress: 1500,
  checkProgress: ({ match, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );
    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'spinningBlades'
    );
    const progress =
      (existingTrophy ? existingTrophy.progress : 0) +
      (participant.stats.perk0 === 8005 ? participant.stats.perk0Var1 : 0);

    return Math.min(1, progress / 2500);
  },
};

export default spinningBlades;
