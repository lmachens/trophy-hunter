import { Trophy } from '../types';

const darkinBlade: Trophy = {
  island: 'combatIsland',
  name: 'darkinBlade',
  level: 'combat6',
  title: 'Trinity Force',
  description:
    'Kill an opponent in 90 seconds after you finish Guinsoos Rageblade.',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    const darkinBladeBuy = events.find(
      (event) =>
        event.participantId === participant.participantId &&
        event.type === 'ITEM_PURCHASED' &&
        event.itemId === 3124
    );
    if (!darkinBladeBuy) {
      return 0;
    }

    const darkinBladeKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp > darkinBladeBuy.timestamp &&
        darkinBladeBuy.timestamp <= event.timestamp + 90
    ).length;

    return darkinBladeKills;
  },
  checkLive: ({ allPlayers, events, gameData, trophyData, account }) => {
    if (
      trophyData.darkinBlade &&
      (trophyData.darkinBlade.obtained ||
        trophyData.darkinBlade.gameTime + 180 < gameData.gameTime)
    ) {
      return 0;
    }

    const player = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const hasdarkinBlade = player.items.find((item) => item.itemID === 3124);
    if (!hasdarkinBlade) {
      return 0;
    }

    if (!trophyData.darkinBlade) {
      trophyData.darkinBlade = {
        gameTime: gameData.gameTime,
        obtained: false,
      };
    }

    const killIn3Minutes = !!events.find(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.EventTime > trophyData.darkinBlade.gameTime &&
        trophyData.darkinBlade.gameTime < event.EventTime + 90
    );
    if (killIn3Minutes) {
      trophyData.darkinBlade.obtained = true;
    }
    return Number(killIn3Minutes);
  },
};

export default darkinBlade;
