import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const feedThem: Trophy = {
  island: 'hub',
  name: 'feedThem',
  level: 'hubTeamwork',
  title: 'Feed Them',
  description: `Assist each of your teammates for a kill.\nARAM: Assist 3 kills to each teammate`,
  category: 'teamwork',
  aramSupport: true,
  checkProgress: ({ match, participant, events }) => {
    const assists = events.reduce<{ [teammateId: number]: number }>(
      (assists, event) => {
        if (
          event.type !== 'CHAMPION_KILL' ||
          !event.assistingParticipantIds.includes(participant.participantId)
        ) {
          return assists;
        }
        const teammateId = event.killerId;
        return {
          ...assists,
          [teammateId]: (assists[teammateId] || 0) + 1,
        };
      },
      {}
    );
    if (match.queueId === ARAM_HOWLING_ABYSS) {
      const validAssists = Object.values(assists).filter(
        (assist) => assist >= 3
      ).length;
      return validAssists / 4;
    }
    return Object.keys(assists).length / 4;
  },
  checkLive: ({ gameData, events, account }) => {
    const assists = events.reduce<{ [teammate: string]: number }>(
      (assists, event) => {
        if (
          event.EventName !== 'ChampionKill' ||
          !event.Assisters.includes(account.summoner.name)
        ) {
          return assists;
        }
        const teammate = event.KillerName;
        return {
          ...assists,
          [teammate]: (assists[teammate] || 0) + 1,
        };
      },
      {}
    );

    if (gameData.gameMode === 'ARAM') {
      const validAssists = Object.values(assists).filter(
        (assist) => assist >= 3
      ).length;
      return validAssists / 4;
    }

    return Object.keys(assists).length / 4;
  },
};

export default feedThem;
