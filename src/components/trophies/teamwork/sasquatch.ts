import { Trophy } from '../types';
import { getParticipantAssists } from '../../../api/riot/helpers';

const sasquatch: Trophy = {
  island: 'teamworkIsland',
  name: 'sasquatch',
  level: 'teamwork4',
  title: 'Sasquatch',
  description: 'Assist at least 3 of your teammates a kill before 12 minutes.',
  category: 'teamwork',
  checkProgress: ({ events, participant }) => {
    const assistsBefore12 = getParticipantAssists(
      events,
      participant.participantId
    ).filter((event) => event.timestamp < 720000);
    const assists = assistsBefore12.reduce<{ [teammateId: number]: number }>(
      (assists, event) => {
        const teammateId = event.killerId;
        return {
          ...assists,
          [teammateId]: (assists[teammateId] || 0) + 1,
        };
      },
      {}
    );
    return Object.keys(assists).length / 3;
  },
  checkLive: ({ events, account }) => {
    const assists = events.reduce<{ [teammate: string]: number }>(
      (assists, event) => {
        if (
          event.EventName !== 'ChampionKill' ||
          event.EventTime >= 720 ||
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
    return Object.keys(assists).length / 3;
  },
};

export default sasquatch;
