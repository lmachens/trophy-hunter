import { Trophy } from '../types';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const noxianWarfare: Trophy = {
  island: 'objectivesIsland',
  name: 'noxianWarfare',
  level: 'objectives4',
  title: 'Noxian Warfare',
  description:
    'Have most buildings destroyed (turrets & inhibitors) three times in a row.',
  category: 'objectives',
  maxProgress: 3,
  checkProgress: ({ match, account, participant }) => {
    const mostDestructs =
      participant.stats.inhibitorKills + participant.stats.turretKills >=
      Math.max(
        ...match.participants.map(
          (other) => other.stats.inhibitorKills + other.stats.turretKills
        )
      );

    if (!mostDestructs) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'noxianWarfare');
    return Number(mostDestructs) / 3 + trophyProgress;
  },
  checkLive: ({ events, account }) => {
    const destructs = events.filter(
      (event) =>
        event.EventName === 'TurretKilled' || event.EventName === 'InhibKilled'
    );
    const mostDestructs =
      destructs.filter(
        (destruct) =>
          destruct.KillerName === account.summoner.name ||
          destruct.Assisters.includes(account.summoner.name)
      ).length >= destructs.length;

    if (!mostDestructs) {
      return 0;
    }

    const trophyProgress = getTrophyProgress(account, 'noxianWarfare');
    return Number(mostDestructs) / 3 + trophyProgress;
  },
};

export default noxianWarfare;
