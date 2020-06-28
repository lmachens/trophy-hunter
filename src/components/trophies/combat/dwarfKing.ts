import { Trophy } from '../types';
import { MatchEvent } from '../../../api/riot/types';
import { calcLevel } from '../../../api/riot/helpers';

const dwarfKing: Trophy = {
  island: 'combatIsland',
  name: 'dwarfKing',
  level: 'combat3',
  title: 'Dwarf King',
  description: 'Kill 5 opponents who have a higher level than you.',
  category: 'combat',
  checkProgress: ({ match, timeline, account }) => {
    const participantIdentity = match.participantIdentities.find(
      (participantIdentity) =>
        participantIdentity.player.accountId === account.summoner.accountId
    );

    const dwarfKingKills = timeline.frames.reduce((dwarfKingKills, frame) => {
      const frameDwarfKingKills = frame.events.filter((event) => {
        if (
          event.type !== 'CHAMPION_KILL' ||
          event.killerId !== participantIdentity.participantId
        ) {
          return false;
        }
        const killerLevel = calcLevel(
          timeline,
          event.killerId,
          event.timestamp
        );
        const victimLevel = calcLevel(
          timeline,
          event.victimId,
          event.timestamp
        );

        return killerLevel < victimLevel;
      }).length;

      return dwarfKingKills + frameDwarfKingKills;
    }, 0);

    return Number(dwarfKingKills >= 5);
  },
};

export default dwarfKing;
