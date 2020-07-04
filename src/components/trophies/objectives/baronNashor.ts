import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const baronNashor: Trophy = {
  island: 'combatIsland',
  name: 'baronNashor',
  level: 'objectives1',
  title: 'Baron Nashor',
  description:
    'Kill the giant worm called Baron Nashor twice on the same match.',
  category: 'objectives',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    const teamIds = match.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId === participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const baronKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'BARON_NASHOR' &&
        teamIds.includes(event.killerId)
    ).length;
    return baronKills / 2;
  },
  checkLive: ({ events, account }) => {
    const baronKills = events.filter(
      (event) =>
        event.EventName === 'BaronKill' &&
        (event.KillerName !== account.summoner.name ||
          event.Assisters.includes(account.summoner.name))
    ).length;

    return baronKills / 2;
  },
};

export default baronNashor;