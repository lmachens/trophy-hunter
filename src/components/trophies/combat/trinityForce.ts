import { Trophy } from '../types';

const trinityForce: Trophy = {
  island: 'combat',
  name: 'trinityForce',
  level: 'combat3',
  title: 'Trinity Force',
  description:
    'Use your powerspike. Kill an opponent in the three minutes after you finish Trinity Force.',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    const trinityForceBuy = events.find(
      (event) =>
        event.participantId === participant.participantId &&
        event.type === 'ITEM_PURCHASED' &&
        event.itemId === 3078
    );
    if (!trinityForceBuy) {
      return 0;
    }

    const trinityForceKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp > trinityForceBuy.timestamp &&
        trinityForceBuy.timestamp <= event.timestamp + 180000
    ).length;

    return trinityForceKills;
  },
  checkLive: ({ allPlayers, events, gameData, trophyData, account }) => {
    if (
      trophyData.trinityForce &&
      (trophyData.trinityForce.obtained ||
        trophyData.trinityForce.gameTime + 180 < gameData.gameTime)
    ) {
      return 0;
    }

    const player = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const hasTrinityForce = player.items.find((item) => item.itemID === 3078);
    if (!hasTrinityForce) {
      return 0;
    }

    if (!trophyData.trinityForce) {
      trophyData.trinityForce = {
        gameTime: gameData.gameTime,
        obtained: false,
      };
    }

    const killIn3Minutes = !!events.find(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.EventTime > trophyData.trinityForce.gameTime &&
        trophyData.trinityForce.gameTime < event.EventTime + 180
    );
    if (killIn3Minutes) {
      trophyData.trinityForce.obtained = true;
    }
    return Number(killIn3Minutes);
  },
};

export default trinityForce;
