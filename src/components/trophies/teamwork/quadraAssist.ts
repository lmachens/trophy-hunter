import { Trophy } from '../types';
import { getParticipantAssists } from '../../../api/riot/helpers';
import { zip } from '../../../api/utils/arrays';

const quadraAssist: Trophy = {
  island: 'teamwork',
  name: 'quadraAssist',
  level: 'teamwork4',
  title: 'Quadra Assist',
  description:
    'Achieve four assists with no more than ten seconds between two successive assists.',
  category: 'teamwork',
  checkProgress: ({ events, participant }) => {
    const assists = getParticipantAssists(events, participant.participantId);

    const participantMultiAssistEvents = zip(
      assists,
      assists.slice(1),
      assists.slice(2),
      assists.slice(3)
    );

    const quadraAssists = participantMultiAssistEvents.filter((multiAssist) => {
      const firstTwoKillsSpree =
        multiAssist[1] &&
        multiAssist[0].timestamp + 10000 > multiAssist[1].timestamp;
      const secondTwoKillsSpree =
        multiAssist[2] &&
        multiAssist[1].timestamp + 10000 > multiAssist[2].timestamp;
      const thirdTwoKillsSpree =
        multiAssist[3] &&
        multiAssist[2].timestamp + 10000 > multiAssist[3].timestamp;

      return firstTwoKillsSpree && secondTwoKillsSpree && thirdTwoKillsSpree;
    }).length;

    return quadraAssists;
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
      assists.slice(2),
      assists.slice(3)
    );

    const quadraAssists = participantMultiAssistEvents.filter((multiAssist) => {
      const firstTwoKillsSpree =
        multiAssist[1] &&
        multiAssist[0].EventTime + 10 > multiAssist[1].EventTime;
      const secondTwoKillsSpree =
        multiAssist[2] &&
        multiAssist[1].EventTime + 10 > multiAssist[2].EventTime;
      const thirdTwoKillsSpree =
        multiAssist[3] &&
        multiAssist[2].EventTime + 10 > multiAssist[3].EventTime;

      return firstTwoKillsSpree && secondTwoKillsSpree && thirdTwoKillsSpree;
    }).length;

    return quadraAssists;
  },
};

export default quadraAssist;
