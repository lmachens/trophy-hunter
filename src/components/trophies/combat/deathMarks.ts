import { Trophy } from '../types';
import { getAllKills } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const THIRTY_SECONDS = 30000;
const deathMarks: Trophy = {
  island: 'combat',
  name: 'deathMarks',
  level: 'combat2',
  title: 'Death Marks',
  description:
    "Perform seven kills and don't die in the 30 seconds afer each kill.",
  category: 'combat',
  maxProgress: 7,
  checkProgress: ({ account, events, participant }) => {
    const kills = getAllKills(events);
    const deathMarks = kills.filter((kill) => {
      if (kill.killerId !== participant.participantId) {
        return false;
      }

      const deathInsideCooldown = kills.find(
        (death) =>
          death.victimId === participant.participantId &&
          death.timestamp >= kill.timestamp &&
          death.timestamp < kill.timestamp + THIRTY_SECONDS
      );
      return deathInsideCooldown;
    });

    const trophyProgress = getTrophyProgress(account, 'deathMarks');
    return deathMarks.length / 7 + trophyProgress;
  },
};

export default deathMarks;
