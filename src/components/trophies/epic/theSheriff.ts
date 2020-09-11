import { Trophy } from '../types';
import {
  getParticipantKills,
  getParticipantDeaths,
} from '../../../api/riot/helpers';

const theSheriff: Trophy = {
  island: 'epicIsland',
  name: 'theSheriff',
  level: 'epic2',
  title: 'The Sheriff',
  description: 'Take part in six shutdown kills.',
  category: 'epic',
  checkProgress: ({ events, participant }) => {
    const kills = getParticipantKills(events, participant.participantId);

    const shutDowns = kills.filter((kill) => {
      const killEvents = getParticipantKills(events, kill.victimId);
      const deathEvents = getParticipantDeaths(events, kill.victimId);

      const victimLastDeath = Math.max(
        ...deathEvents.map((victimDeath) =>
          victimDeath.timestamp < kill.timestamp ? victimDeath.timestamp : 0
        )
      );
      const shutDownScore = killEvents.filter(
        (victimKill) =>
          victimKill.timestamp > victimLastDeath &&
          victimKill.timestamp < kill.timestamp
      ).length;

      return shutDownScore >= 3;
    }).length;

    return shutDowns / 6;
  },
};

export default theSheriff;
