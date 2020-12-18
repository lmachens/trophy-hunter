import { Trophy } from '../types';
import {
  getParticipantKills,
  getParticipantDeaths,
} from '../../../api/riot/helpers';

const theZombie: Trophy = {
  island: 'hub',
  name: 'theZombie',
  level: 'combat5',
  title: 'The Zombie',
  description: 'Score at least two kills being dead (ten seconds after death).',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    const deaths = getParticipantDeaths(events, participant.participantId);
    const kills = getParticipantKills(events, participant.participantId);
    const zombieKills = kills.filter((kill) =>
      deaths.some(
        (death) =>
          kill.timestamp > death.timestamp &&
          kill.timestamp < 10000 + death.timestamp
      )
    ).length;

    return zombieKills / 2;
  },
  checkLive: ({ events, account }) => {
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

    const zombieKills = kills.filter((kill) =>
      deaths.some(
        (death) =>
          kill.EventTime > death.EventTime &&
          kill.EventTime < 10 + death.EventTime
      )
    ).length;

    return zombieKills / 2;
  },
};

export default theZombie;
