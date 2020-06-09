import { Trophy } from '../types';
import CombatProgress from '../combat/CombatProgress';

const kitchenKnife: Trophy = {
  island: 'hubIsland',
  name: 'kitchenKnife',
  level: 'hubCombat',
  title: 'Kitchen Knife',
  description: 'Deal more than 30000 total damage to champions.',
  ProgressIcon: CombatProgress,
  checkProgress: ({ match, account }) => {
    const participantIdentity = match.participantIdentities.find(
      (participantIdentity) =>
        participantIdentity.player.accountId === account.summoner.accountId
    );
    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );

    return Number(participant.stats.totalDamageDealtToChampions >= 30000);
  },
};

export default kitchenKnife;
