import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const demolitionPear: Trophy = {
  island: 'combatIsland',
  name: 'demolitionPear',
  level: 'objectives3',
  title: 'Demolition Pear',
  description: 'Takedown at least 5 turrets.',
  category: 'objectives',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return participant.stats.turretKills / 5;
  },
  checkLive: ({ events, account }) => {
    const turretKills = events.filter(
      (event) =>
        event.EventName === 'TurretKilled' &&
        event.KillerName === account.summoner.name
    ).length;

    return turretKills / 5;
  },
};

export default demolitionPear;
