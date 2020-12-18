import { Trophy } from '../types';

const bloodBrothers: Trophy = {
  island: 'teamwork',
  name: 'bloodBrothers',
  level: 'teamwork2',
  title: 'Blood Brothers',
  description:
    'You and a teammate score 7 kills with only the two of you involved.',
  category: 'teamwork',
  checkProgress: ({ events, participant }) => {
    const duoKills = events.reduce<{ [teammateId: number]: number }>(
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
    return Math.max(...Object.values(duoKills), 0) / 7;
  },
  checkLive: ({ events, account, trophyData }) => {
    if (!events.length || trophyData.bloodBrothers) {
      return 0;
    }

    const duoKills = events.reduce<{ [teammate: string]: number }>(
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
    const progress = Math.min(1, Math.max(...Object.values(duoKills)) / 7);
    if (progress === 1) {
      trophyData.bloodBrothers = true;
    }
    return progress;
  },
};

export default bloodBrothers;
