import { ARAM_HOWLING_ABYSS } from '../../../api/overwolf';
import { ChampionKillEvent } from '../../../api/riot/types';
import { Trophy } from '../types';

const theHive: Trophy = {
  island: 'epic',
  name: 'theHive',
  level: 'epic2',
  title: 'The Hive',
  description: `Your team kills every enemy champion with all of your team being involved.\nARAM: 12 kills with all of your team involved`,
  category: 'epic',
  aramSupport: true,
  checkProgress: ({ events, participant, match }) => {
    const hiveKills = <ChampionKillEvent[]>(
      events.filter(
        (event) =>
          event.type === 'CHAMPION_KILL' &&
          event.assistingParticipantIds.some(
            (assister) => assister === participant.participantId
          ) &&
          event.assistingParticipantIds.length >= 4
      )
    );
    if (match.info.queueId === ARAM_HOWLING_ABYSS) {
      return hiveKills.length / 12;
    }

    const victimIds = hiveKills.map((event) => event.victimId);
    const uniqueVictims = victimIds.filter(
      (victimId, index, current) => current.indexOf(victimId) === index
    ).length;
    return uniqueVictims / 5;
  },
  checkLive: ({ events, account, gameData }) => {
    const hiveKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters.some(
          (assister) => assister === account.summoner.name
        ) &&
        event.Assisters.length >= 4
    );
    if (gameData.gameMode === 'ARAM') {
      return hiveKills.length / 12;
    }
    const victimNames = hiveKills.map((event) => event.VictimName);
    const uniqueVictims = victimNames.filter(
      (victimName, index, current) => current.indexOf(victimName) === index
    ).length;
    return uniqueVictims / 5;
  },
};

export default theHive;
