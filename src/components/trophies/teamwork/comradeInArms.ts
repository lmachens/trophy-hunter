import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const comradeInArms: Trophy = {
  island: 'hubIsland',
  name: 'comradeInArms',
  level: 'hubTeamwork',
  title: 'Comrade In Arms',
  description:
    'You and a teammate score three kills with only the two of you involved.',
  category: 'teamwork',
  checkProgress: ({ match, timeline, account }) => {
    const participant = getParticipantByAccount(match, account);
    const allEvents = timeline.frames.reduce(
      (events, frame) => [...events, ...frame.events],
      []
    );
    const duoKills = allEvents.reduce<{ [teammateId: number]: number }>(
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

    return Math.max(...Object.values(duoKills)) / 3;
  },
  checkLive: ({ events, account, trophyData }) => {
    if (!events.length || trophyData.comradeInArms) {
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
    const progress = Math.min(1, Math.max(...Object.values(duoKills)) / 3);
    if (progress === 1) {
      trophyData.comradeInArms = true;
    }
    return progress;
  },
};

export default comradeInArms;
