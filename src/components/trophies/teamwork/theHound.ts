import { Trophy } from '../types';
import { getParticipantAssists } from '../../../api/riot/helpers';
import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';

const theHound: Trophy = {
  island: 'teamwork',
  name: 'theHound',
  level: 'teamwork8',
  title: 'The Hound',
  description: `Set up others to carry. Achieve five assists before ten minutes.\nARAM: Eight assists before 5 minutes`,
  category: 'teamwork',
  aramSupport: true,
  checkProgress: ({ participant, events, match }) => {
    const participantAssists = getParticipantAssists(
      events,
      participant.participantId
    );
    if (match.info.queueId === ARAM_HOWLING_ABYSS) {
      const assists = participantAssists.filter(
        (assist) => assist.timestamp < 300000
      );
      return assists.length / 8;
    }

    const assists = participantAssists.filter(
      (assist) => assist.timestamp < 600000
    );
    return assists.length / 5;
  },
  checkLive: ({ events, account, gameData }) => {
    if (gameData.gameMode === 'ARAM') {
      const assists = events.filter(
        (event) =>
          event.EventName === 'ChampionKill' &&
          event.Assisters.includes(account.summoner.name) &&
          event.EventTime < 300
      );
      return assists.length / 8;
    }

    const assists = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters.includes(account.summoner.name) &&
        event.EventTime < 600
    );
    return assists.length / 5;
  },
};

export default theHound;
