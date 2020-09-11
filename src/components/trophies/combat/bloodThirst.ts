import { Trophy } from '../types';
import { getParticipantKills } from '../../../api/riot/helpers';

const bloodThirst: Trophy = {
  island: 'combatIsland',
  name: 'bloodThirst',
  level: 'combat5',
  title: 'Blood Thirst',
  description:
    'Perform a kill every 5 minutes after minions have spawned in a 20 min+ match.',
  category: 'combat',
  checkProgress: ({ match, events, participant }) => {
    const kills = getParticipantKills(events, participant.participantId);

    const gameLongEnough = match.gameDuration > 20 * 60;
    const atLeastOneKill = participant.stats.kills > 0;
    const killTimingsOK = kills.every((kill, index) => {
      let killInTiming = true;
      if (index === 0) {
        // 5 min after minions spawn
        killInTiming = kill.timestamp < 375000;
      } else {
        // less than 5 min between consecutive kills
        killInTiming = kill.timestamp < kills[index - 1].timestamp + 300000;
      }
      if (index === kills.length - 1) {
        // In 5 min before end
        killInTiming =
          killInTiming && kill.timestamp >= match.gameDuration * 1000 - 300000;
      }
      return killInTiming;
    });
    const progress =
      Number(gameLongEnough) + Number(atLeastOneKill) + Number(killTimingsOK);
    return progress / 3;
  },
  checkLive: ({ events, gameData, account }) => {
    const gameLongEnough = gameData.gameTime > 20 * 60;
    const kills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name
    );
    const atLeastOneKill = kills.length > 0;
    const killTimingsOK = kills.every((kill, index) => {
      let killInTiming = true;
      if (index === 0) {
        // 5 min after minions spawn
        killInTiming = kill.EventTime < 375;
      } else {
        // less than 5 min between consecutive kills
        killInTiming = kill.EventTime < kills[index - 1].EventTime + 300;
      }
      if (index === kills.length - 1) {
        // In 5 min before end
        killInTiming =
          killInTiming && kill.EventTime >= gameData.gameTime - 300;
      }
      return killInTiming;
    });
    const progress =
      Number(gameLongEnough) + Number(atLeastOneKill) + Number(killTimingsOK);
    return progress / 3;
  },
};

export default bloodThirst;
