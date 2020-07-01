import { Trophy } from '../types';
import { MatchEvent } from '../../../api/riot/types';
import {
  calcDeathTime,
  calcLevel,
  eventTimeToTimestamp,
  getParticipantIdentity,
} from '../../../api/riot/helpers';

const revenge: Trophy = {
  island: 'combatIsland',
  name: 'revenge',
  level: 'combat3',
  title: 'REVENGE!!!',
  description: 'Kill your killer in the 30 seconds after you have respawned.',
  category: 'combat',
  checkProgress: ({ match, timeline, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const killsAndDeaths = timeline.frames.reduce<{
      kills: MatchEvent[];
      deaths: MatchEvent[];
    }>(
      (current, frame) => ({
        kills: [
          ...current.kills,
          ...frame.events.filter(
            (event) =>
              event.type === 'CHAMPION_KILL' &&
              event.killerId === participantIdentity.participantId
          ),
        ],
        deaths: [
          ...current.deaths,
          ...frame.events.filter(
            (event) =>
              event.type === 'CHAMPION_KILL' &&
              event.victimId === participantIdentity.participantId
          ),
        ],
      }),
      { kills: [], deaths: [] }
    );

    const revengeKills = killsAndDeaths.kills.filter(
      (kill) =>
        killsAndDeaths.deaths.filter((death) => {
          const level = calcLevel(
            timeline,
            participantIdentity.participantId,
            death.timestamp
          );
          const deathTime = calcDeathTime(level, death.timestamp);

          const isKillerNowVictim = death.killerId === kill.victimId;
          const isDeathBeforeKill = death.timestamp < kill.timestamp;
          const isDeathAtMost60SBeforeKill =
            death.timestamp + deathTime + 60000 > kill.timestamp;
          return (
            isKillerNowVictim && isDeathBeforeKill && isDeathAtMost60SBeforeKill
          );
        }).length > 0
    ).length;

    return Number(revengeKills >= 1);
  },
  checkLive: ({ activePlayer, trophyData, events, account }) => {
    if (!events.length || !activePlayer || trophyData.revenge) {
      return 0;
    }
    const kills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name
    );
    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    );

    const revengeKills = kills.filter(
      (kill) =>
        deaths.filter((death) => {
          const level = activePlayer.level;
          const deathTimestamp = eventTimeToTimestamp(death.EventTime);
          const killTimestamp = eventTimeToTimestamp(kill.EventTime);
          const deathTime = calcDeathTime(level, deathTimestamp);

          const isKillerNowVictim = death.KillerName === kill.VictimName;
          const isDeathBeforeKill = deathTimestamp < killTimestamp;
          const isDeathAtMost60SBeforeKill =
            deathTimestamp + deathTime + 60000 > killTimestamp;
          return (
            isKillerNowVictim && isDeathBeforeKill && isDeathAtMost60SBeforeKill
          );
        }).length > 0
    ).length;

    if (revengeKills >= 1) {
      trophyData.revenge = true;
    }
    return Number(revengeKills > 1);
  },
};

export default revenge;
