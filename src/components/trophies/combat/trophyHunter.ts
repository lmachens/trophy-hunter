import { Trophy } from '../types';

const trophyHunter: Trophy = {
  island: 'hubIsland',
  name: 'trophyHunter',
  level: 'hubCombat',
  title: 'Trophy Hunter',
  description: 'Kill each unique enemy champion at least once.',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    const victimIds = events
      .filter(
        (event) =>
          event.type === 'CHAMPION_KILL' &&
          event.killerId === participant.participantId
      )
      .map((event) => event.victimId);
    const uniqueVictimIds = victimIds.filter(
      (victimId, index, current) => current.indexOf(victimId) === index
    );
    return uniqueVictimIds.length / 5;
  },
  checkLive: ({ events, trophyData, account }) => {
    if (!events.length) {
      return 0;
    }

    const championKills = events.reduce((current, event) => {
      if (
        event.EventName !== 'ChampionKill' ||
        event.KillerName !== account.summoner.name ||
        current.includes(event.VictimName)
      ) {
        return current;
      }
      return [...current, event.VictimName];
    }, []);

    if (championKills.length <= (trophyData.trophyHunter || 0)) {
      return 0;
    }

    trophyData.trophyHunter = championKills.length;
    return championKills.length / 5;
  },
};

export default trophyHunter;
