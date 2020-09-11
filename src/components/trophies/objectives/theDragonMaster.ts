import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const theDragonMaster: Trophy = {
  island: 'objectivesIsland',
  name: 'theDragonMaster',
  level: 'objectives3',
  title: 'The Dragon Master',
  description: 'Kill the first dragon before 10 minutes into the game.',
  category: 'objectives',
  checkProgress: ({ match, events, account }) => {
    const participant = getParticipantByAccount(match, account);

    const earlyDragonKill = events.some(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'DRAGON' &&
        event.timestamp < 10 * 60 * 1000 &&
        event.killerId === participant.participantId
    );
    return Number(earlyDragonKill);
  },
  checkLive: ({ events, account }) => {
    const earlyDragonKills = events.filter(
      (event) => event.EventName === 'DragonKill' && event.EventTime < 10 * 60
    );

    return Number(
      earlyDragonKills[0] &&
        earlyDragonKills[0].KillerName === account.summoner.name
    );
  },
};

export default theDragonMaster;
