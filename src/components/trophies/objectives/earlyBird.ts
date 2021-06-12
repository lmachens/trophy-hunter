import { Trophy } from '../types';

const earlyBird: Trophy = {
  island: 'objectives',
  name: 'earlyBird',
  level: 'objectives2',
  title: 'Early Bird',
  description: 'Take first blood and first turret (or assist).',
  category: 'objectives',
  checkProgress: ({ participant }) => {
    if (
      !participant.firstBloodKill ||
      (!participant.firstTowerAssist && !participant.firstTowerKill)
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
