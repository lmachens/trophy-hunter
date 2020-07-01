import { Trophy } from '../types';
import { getParticipantIdentity } from '../../../api/riot/helpers';

const trophyHunter: Trophy = {
  island: 'hubIsland',
  name: 'trophyHunter',
  level: 'hubCombat',
  title: 'Trophy Hunter',
  description: 'Kill each unique enemy champion at least once.',
  category: 'combat',
  checkProgress: ({ match, timeline, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );

    const uniqueKillIds = timeline.frames.reduce((current, frame) => {
      const participantKills = frame.events.filter(
        (event) =>
          event.type === 'CHAMPION_KILL' &&
          event.killerId === participant.participantId
      );
      if (participantKills.length === 0) {
        return current;
      }
      const newKillIds = participantKills.filter(
        (kill) => !current.includes(kill.victimId)
      );
      return [...current, ...newKillIds];
    }, []);

    return Number(uniqueKillIds.length === 5);
  },
  checkLive: ({ events, trophyData, account }) => {
    if (!events.length) {
      return 0;
    }

    const championKills = events.reduce((current, event) => {
      if (
        event.EventName !== 'ChampionKill' ||
        event.KillerName !== account.summoner.name ||
        current.includes(event.VictimName)
      ) {
        return current;
      }
      return [...current, event.VictimName];
    }, []);

    if (championKills.length <= (trophyData.trophyHunter || 0)) {
      return 0;
    }

    trophyData.trophyHunter = championKills.length;
    return Number(championKills.length / 5);
  },
};

export default trophyHunter;
