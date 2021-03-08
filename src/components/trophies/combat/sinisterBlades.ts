import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const sinisterBlades: Trophy = {
  island: 'combat',
  name: 'sinisterBlades',
  level: 'combat6',
  title: 'Sinister Blades',
  description: `Achieve at least four multikills (double-, triple-, quadra- or pentakill).\nARAM: Seven multikills`,
  category: 'combat',
  aramSupport: true,
  checkProgress: ({ participant, match }) => {
    const requiredDoubleKills = match.queueId === ARAM_HOWLING_ABYSS ? 7 : 4;
    return participant.stats.doubleKills / requiredDoubleKills;
  },
  checkLive: ({ events, account, gameData }) => {
    const multikills = events.filter(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name
    ).length;
    const requiredDoubleKills = gameData.gameMode === 'ARAM' ? 7 : 4;
    return multikills / requiredDoubleKills;
  },
};

export default sinisterBlades;
