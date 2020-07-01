import { Trophy } from '../types';
import { getParticipantIdentity } from '../../../api/riot/helpers';

const soulHarvest: Trophy = {
  island: 'combatIsland',
  name: 'soulHarvest',
  level: 'combat3',
  title: 'Soul Harvest',
  description: 'Deal more than 2000 damage with Dark Harvest (rune).',
  category: 'combat',
  maxProgress: 2000,
  checkProgress: ({ match, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );
    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'soulHarvest'
    );
    const progress =
      (existingTrophy ? existingTrophy.progress : 0) +
      (participant.stats.perk0 === 8128 ? participant.stats.perk0Var1 : 0);

    return Math.min(1, progress / 2000);
  },
};

export default soulHarvest;
