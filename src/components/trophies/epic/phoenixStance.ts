import { Trophy } from '../types';
import { getTeam } from '../../../api/riot/helpers';

const phoenixStance: Trophy = {
  island: 'epic',
  name: 'phoenixStance',
  level: 'epic1',
  title: 'Phoenix Stance',
  description: 'Win a game where you kill two elder dragons.',
  category: 'epic',
  checkProgress: ({ match, events, participant }) => {
    const teamIds = getTeam(match, participant.teamId).map(
      (teammate) => teammate.participantId
    );

    const elderDragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterSubType === 'ELDER_DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    return Number(elderDragonKills >= 2 && participant.win);
  },
};

export default phoenixStance;
