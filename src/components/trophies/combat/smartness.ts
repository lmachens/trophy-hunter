import { Trophy } from '../types';

const smartness: Trophy = {
  island: 'combatIsland',
  name: 'smartness',
  level: 'combat2',
  title: 'Smartness',
  description:
    'Score a killing spree, at least ten assists and die at most five times.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participantIdentity = match.participantIdentities.find(
      (participantIdentity) =>
        participantIdentity.player.accountId === account.summoner.accountId
    );
    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );
    const hasKillingSpree = participant.stats.killingSprees >= 1;
    const hasTenAssists = participant.stats.assists >= 10;
    const hasLessThanFiveDeaths = participant.stats.deaths <= 5;

    return Number(hasKillingSpree && hasTenAssists && hasLessThanFiveDeaths);
  },
};

export default smartness;
