import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const livingArtillery: Trophy = {
  island: 'combatIsland',
  name: 'livingArtillery',
  level: 'combat5',
  title: 'Living Artillery',
  description: "Deal more than 35% of your team's damage.",
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const teammates = match.participants.filter(
      (matchParticipant) =>
        matchParticipant.teamId === participant.teamId &&
        matchParticipant.participantId !== participant.teamId
    );
    const teammatesDamage = teammates.reduce(
      (current, teammate) =>
        current + teammate.stats.totalDamageDealtToChampions,
      0
    );

    const damageShare =
      participant.stats.totalDamageDealtToChampions / teammatesDamage;
    return damageShare / 0.35;
  },
};

export default livingArtillery;
