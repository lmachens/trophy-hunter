import { Trophy } from '../types';
import { getParticipantByAccount, getTeam } from '../../../api/riot/helpers';

const phoenixStance: Trophy = {
  island: 'epicIsland',
  name: 'phoenixStance',
  level: 'epic1',
  title: 'Phoenix Stance',
  description: 'Win a game where you kill two elder dragons.',
  category: 'epic',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);
    const teamIds = getTeam(match, participant.teamId).map(
      (teammate) => teammate.participantId
    );

    const elderDragonKills = events.filter(
      (event) =>
        event.monsterSubType === 'ELDER_DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    return Number(elderDragonKills >= 2 && participant.stats.win);
  },
};

export default phoenixStance;
