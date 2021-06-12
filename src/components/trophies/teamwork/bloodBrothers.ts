import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { Trophy } from '../types';

const bloodBrothers: Trophy = {
  island: 'teamwork',
  name: 'bloodBrothers',
  level: 'teamwork2',
  title: 'Blood Brothers',
  description:
    'You and a teammate score 7 kills with only the two of you involved.\nARAM: 5 kills',
  category: 'teamwork',
  aramSupport: true,
  checkProgress: ({ events, participant, match }) => {
    const duoKillsEvents = events.reduce<{ [teammateId: number]: number }>(
      (duoKills, event) => {
        if (
          event.type !== 'CHAMPION_KILL' ||
          (event.killerId !== participant.participantId &&
            !event.assistingParticipantIds.includes(
              participant.participantId
            )) ||
          event.assistingParticipantIds.length !== 1
        ) {
          return duoKills;
        }
        const teammateId =
          event.killerId === participant.participantId
            ? event.assistingParticipantIds[0]
            : event.killerId;
        return {
          ...duoKills,
          [teammateId]: (duoKills[teammateId] || 0) + 1,
        };
      },
      {}
    );
    const duoKills = Math.max(...Object.values(duoKillsEvents), 0);
    if (match.info.queueId === ARAM_HOWLING_ABYSS) {
      return duoKills / 5;
    }
    return duoKills / 7;
  },
  checkLive: ({ events, account, gameData }) => {
    const duoKillsEvents = events.reduce<{ [teammate: string]: number }>(
      (duoKills, event) => {
        if (
          event.EventName !== 'ChampionKill' ||
          (event.KillerName !== account.summoner.name &&
            !event.Assisters.includes(account.summoner.name)) ||
          event.Assisters.length !== 1
        ) {
          return duoKills;
        }
        const teammate =
          event.KillerName === account.summoner.name
            ? event.Assisters[0]
            : event.KillerName;
        return {
          ...duoKills,
          [teammate]: (duoKills[teammate] || 0) + 1,
        };
      },
      {}
    );
    const duoKills = Math.max(...Object.values(duoKillsEvents), 0);
    if (gameData.gameMode === 'ARAM') {
      return duoKills / 5;
    }
    return duoKills / 7;
  },
};

export default bloodBrothers;
