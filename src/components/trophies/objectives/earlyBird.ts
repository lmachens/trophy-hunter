import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const earlyBird: Trophy = {
  island: 'objectivesIsland',
  name: 'earlyBird',
  level: 'objectives2',
  title: 'Early Bird',
  description: 'Take first blood and first turret (or assist).',
  category: 'objectives',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    if (
      !participant.stats.firstBloodKill ||
      (!participant.stats.firstTowerAssist && !participant.stats.firstTowerKill)
    ) {
      return 0;
    }
    return 1;
  },
  checkLive: ({ events, account }) => {
    const firstKill = events.find(
      (event) => event.EventName === 'ChampionKill'
    );
    const firstTower = events.find(
      (event) => event.EventName === 'TurretKilled'
    );

    const firstBloodKill =
      firstKill && firstKill.KillerName === account.summoner.name;
    const firstTowerKill =
      firstTower && firstTower.KillerName === account.summoner.name;
    const firstTowerAssist =
      firstTower && firstTower.Assisters.includes(account.summoner.name);

    return (
      (Number(firstBloodKill) + Number(firstTowerKill || firstTowerAssist)) / 2
    );
  },
};

export default earlyBird;
