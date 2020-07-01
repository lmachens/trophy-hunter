import { Trophy } from '../types';
import { MatchEvent } from '../../../api/riot/types';
import { getParticipantIdentity } from '../../../api/riot/helpers';

const THIRTY_SECONDS = 30000;
const deathMarks: Trophy = {
  island: 'combatIsland',
  name: 'deathMarks',
  level: 'combat2',
  title: 'Death Marks',
  description:
    "Perform seven kills and don't die in the 30 seconds afer each kill.",
  category: 'combat',
  maxProgress: 7,
  checkProgress: ({ match, timeline, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const kills = timeline.frames.reduce<MatchEvent[]>(
      (events, frame) => [
        ...events,
        ...frame.events.filter((event) => event.type === 'CHAMPION_KILL'),
      ],
      []
    );

    const deathMarks = kills.filter((kill) => {
      if (kill.killerId !== participantIdentity.participantId) {
        return false;
      }

      const deathInsideCooldown = kills.find(
        (death) =>
          death.victimId === participantIdentity.participantId &&
          death.timestamp >= kill.timestamp &&
          death.timestamp < kill.timestamp + THIRTY_SECONDS
      );
      return deathInsideCooldown;
    });
    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'deathMarks'
    );
    const progress =
      (existingTrophy ? existingTrophy.progress : 0) + deathMarks.length;

    return Math.min(1, progress / 7);
  },
};

export default deathMarks;
