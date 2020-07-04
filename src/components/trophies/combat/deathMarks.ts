import { Trophy } from '../types';
import { getParticipantIdentity, getAllKills } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

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
  checkProgress: ({ match, events, account }) => {
    const participantIdentity = getParticipantIdentity(match, account);

    const kills = getAllKills(events);
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

    const trophyProgress = getTrophyProgress(account, 'deathMarks');
    return (deathMarks.length + trophyProgress * 7) / 7;
  },
};

export default deathMarks;
