import { Trophy } from '../types';

const feedThem: Trophy = {
  island: 'hubIsland',
  name: 'feedThem',
  level: 'hubTeamwork',
  title: 'Feed Them',
  description: 'Assist each of your teammates for a kill.',
  category: 'teamwork',
  checkProgress: ({ match, timeline, account }) => {
    const participantIdentity = match.participantIdentities.find(
      (participantIdentity) =>
        participantIdentity.player.accountId === account.summoner.accountId
    );
    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );
    const allEvents = timeline.frames.reduce(
      (events, frame) => [...events, ...frame.events],
      []
    );
    const assists = allEvents.reduce<{ [teammateId: number]: number }>(
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

    return Number(Object.keys(assists).length === 4);
  },
  checkLive: ({ events, account, trophyData }) => {
    if (!events.length || trophyData.feedThem) {
      return 0;
    }

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
    const progress = Object.keys(assists).length / 4;
    if (progress === 1) {
      trophyData.feedThem = true;
    }
    return progress;
  },
};

export default feedThem;
