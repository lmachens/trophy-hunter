import { Trophy } from '../types';
import { getParticipantAssists } from '../../../api/riot/helpers';
import { zip } from '../../../api/utils/arrays';

const tripleAssist: Trophy = {
  island: 'teamwork',
  name: 'tripleAssist',
  level: 'teamwork1',
  title: 'Triple Assist',
  description:
    'Achieve three assists with no more than ten seconds between two successive assists.',
  category: 'teamwork',
  checkProgress: ({ events, participant }) => {
    const assists = getParticipantAssists(events, participant.participantId);

    const participantMultiAssistEvents = zip(
      assists,
      assists.slice(1),
      assists.slice(2)
    );

    const tripleAssists = participantMultiAssistEvents.filter((multiAssist) => {
      const firstTwoKillsSpree =
        multiAssist[1] &&
        multiAssist[0].timestamp + 10000 > multiAssist[1].timestamp;
      const secondTwoKillsSpree =
        multiAssist[2] &&
        multiAssist[1].timestamp + 10000 > multiAssist[2].timestamp;

      return firstTwoKillsSpree && secondTwoKillsSpree;
    }).length;

    return tripleAssists;
  },
  checkLive: ({ events, account }) => {
    const assists = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters.includes(account.summoner.name)
    );

    const participantMultiAssistEvents = zip(
      assists,
      assists.slice(1),
      assists.slice(2)
    );

    const tripleAssists = participantMultiAssistEvents.filter((multiAssist) => {
      const firstTwoKillsSpree =
        multiAssist[1] &&
        multiAssist[0].EventTime + 10 > multiAssist[1].EventTime;
      const secondTwoKillsSpree =
        multiAssist[2] &&
        multiAssist[1].EventTime + 10 > multiAssist[2].EventTime;

      return firstTwoKillsSpree && secondTwoKillsSpree;
    }).length;

    return tripleAssists;
  },
};

export default tripleAssist;
