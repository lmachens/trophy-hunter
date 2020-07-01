import { Trophy } from '../types';
import { getParticipantIdentity } from '../../../api/riot/helpers';

const duelist: Trophy = {
  island: 'combatIsland',
  name: 'duelist',
  level: 'combat2',
  title: 'Duelist',
  description: 'Achieve three solo kills.',
  category: 'combat',
  checkProgress: ({ match, timeline, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const soloKills = timeline.frames.reduce(
      (soloKills, frame) =>
        soloKills +
        frame.events.filter(
          (event) =>
            event.type === 'CHAMPION_KILL' &&
            event.killerId === participantIdentity.participantId &&
            event.assistingParticipantIds.length === 0
        ).length,
      0
    );
    return Math.min(1, soloKills / 3);
  },
  checkLive: ({ events, trophyData, account }) => {
    if (trophyData.duelist || events.length === 0) {
      return 0;
    }

    const soloKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.Assisters.length === 0
    ).length;
    const progress = Math.min(1, soloKills / 3);
    if (progress === 1) {
      trophyData.duelist = true;
    }
    return progress;
  },
};

export default duelist;
