import { Trophy, Event } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { MatchEvent } from '../../../api/riot/types';

const ninjas: Trophy = {
  island: 'teamworkIsland',
  name: 'ninjas',
  level: 'teamwork6',
  title: 'Ninjas',
  description:
    'You and a teammate score three kills with no other assist and no more than ten seconds between two kills.',
  category: 'teamwork',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    const duoKills = events.reduce<{ [teammateId: number]: MatchEvent[] }>(
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
          [teammateId]: [...(duoKills[teammateId] || []), event],
        };
      },
      {}
    );
    const hasDuoTripleKills = Object.values(duoKills).some(
      (duoKills) =>
        duoKills.length >= 3 &&
        duoKills[0].timestamp + 10000 > duoKills[1].timestamp &&
        duoKills[1].timestamp + 10000 > duoKills[2].timestamp
    );

    return Number(hasDuoTripleKills);
  },
  checkLive: ({ events, account }) => {
    const duoKills = events.reduce<{ [teammate: string]: Event[] }>(
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
          [teammate]: [...(duoKills[teammate] || []), event],
        };
      },
      {}
    );

    const hasDuoTripleKills = Object.values(duoKills).some(
      (duoKills) =>
        duoKills.length >= 3 &&
        duoKills[0].EventTime + 10 > duoKills[1].EventTime &&
        duoKills[1].EventTime + 10 > duoKills[2].EventTime
    );

    return Number(hasDuoTripleKills);
  },
};

export default ninjas;
