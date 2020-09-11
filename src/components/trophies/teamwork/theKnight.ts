import { Trophy } from '../types';
import {
  getAllKills,
  calcDeathTime,
  calcLevel,
  eventTimeToTimestamp,
} from '../../../api/riot/helpers';

const theKnight: Trophy = {
  island: 'teamworkIsland',
  name: 'theKnight',
  level: 'teamwork7',
  title: 'The Knight',
  description: 'Be the only champion alive on Summoners Rift.',
  category: 'teamwork',
  checkProgress: ({ participant, events }) => {
    const allKills = getAllKills(events);
    const isValid = allKills.some((kill, index) => {
      if (index < 9 || kill.victimId === participant.participantId) {
        return false;
      }

      let currentDeaths = 1;
      for (let i = 1; i < 9; i++) {
        const otherKill = allKills[index - i];
        const level = calcLevel(
          events,
          otherKill.victimId,
          otherKill.timestamp
        );
        const deathTime = calcDeathTime(level, otherKill.timestamp);

        const killedBefore = otherKill.timestamp <= kill.timestamp;
        const stillDead = otherKill.timestamp + deathTime >= kill.timestamp;
        const notParticipant = otherKill.victimId !== participant.participantId;
        currentDeaths += Number(killedBefore && stillDead && notParticipant);
        if (!(killedBefore && stillDead && notParticipant)) {
          break;
        }
      }
      return currentDeaths === 9;
    });
    return Number(isValid);
  },
  checkLive: ({ events, allPlayers, account }) => {
    const allKills = events.filter(
      (event) => event.EventName === 'ChampionKill'
    );
    const isValid = allKills.some((kill, index) => {
      if (index < 9 || kill.VictimName === account.summoner.name) {
        return false;
      }
      let currentDeaths = 1;
      for (let i = 1; i < 9; i++) {
        const otherKill = allKills[index - i];
        const level = allPlayers.find(
          (player) => player.summonerName === otherKill.VictimName
        )?.level;
        const killTimestamp = eventTimeToTimestamp(kill.EventTime);
        const otherKillTimestamp = eventTimeToTimestamp(otherKill.EventTime);
        const deathTime = calcDeathTime(level, otherKillTimestamp);

        const killedBefore = otherKillTimestamp <= killTimestamp;
        const stillDead = otherKillTimestamp + deathTime >= killTimestamp;
        const notParticipant = otherKill.VictimName !== account.summoner.name;
        currentDeaths += Number(killedBefore && stillDead && notParticipant);
        if (!(killedBefore && stillDead && notParticipant)) {
          break;
        }
      }
      return currentDeaths === 9;
    });
    return Number(isValid);
  },
};

export default theKnight;
