import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const firstBlood: Trophy = {
  island: 'combatIsland',
  name: 'firstBlood',
  level: 'combat1',
  title: 'First Blood',
  description: 'Take first blood.',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    return Number(participant.stats.firstBloodKill);
  },
  checkLive: ({ events, account }) => {
    const firstKill = events.find(
      (event) => event.EventName === 'ChampionKill'
    );

    const firstBloodKill =
      firstKill && firstKill.KillerName === account.summoner.name;

    return Number(firstBloodKill);
  },
};

export default firstBlood;
