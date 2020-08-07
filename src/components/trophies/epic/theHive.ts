import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const theHive: Trophy = {
  island: 'epicIsland',
  name: 'theHive',
  level: 'epic2',
  title: 'The Hive',
  description:
    'Your team kills every enemy champion with all of your team being involved.',
  category: 'epic',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    const hiveKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.assistingParticipantIds.some(
          (assister) => assister === participant.participantId
        ) &&
        event.assistingParticipantIds.length >= 4
    );
    const victimIds = hiveKills.map((event) => event.victimId);
    const uniqueVictims = victimIds.filter(
      (victimId, index, current) => current.indexOf(victimId) === index
    ).length;
    return uniqueVictims / 5;
  },
  checkLive: ({ events, account }) => {
    const hiveKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters.some(
          (assister) => assister === account.summoner.name
        ) &&
        event.Assisters.length >= 4
    );
    const victimNames = hiveKills.map((event) => event.VictimName);
    const uniqueVictims = victimNames.filter(
      (victimName, index, current) => current.indexOf(victimName) === index
    ).length;
    return uniqueVictims / 5;
  },
};

export default theHive;
