import { Trophy } from '../types';
import { MatchEvent } from '../../../api/riot/types';

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

    const allLevelUps = timeline.frames.reduce<MatchEvent[]>(
      (levelUps, frame) => [
        ...levelUps,
        ...frame.events.filter(
          (event) =>
            event.type === 'SKILL_LEVEL_UP' && event.levelUpType === 'NORMAL'
        ),
      ],
      []
    );

    const dwarfKingKills = timeline.frames.reduce((dwarfKingKills, frame) => {
      const frameDwarfKingKills = frame.events.filter((event) => {
        if (
          event.type !== 'CHAMPION_KILL' ||
          event.killerId !== participantIdentity.participantId
        ) {
          return false;
        }
        const killerLevel = allLevelUps.filter(
          (levelUp) =>
            levelUp.participantId === event.killerId &&
            levelUp.timestamp < event.timestamp
        ).length;
        const victimLevel = allLevelUps.filter(
          (levelUp) =>
            levelUp.participantId === event.victimId &&
            levelUp.timestamp < event.timestamp
        ).length;

        return killerLevel < victimLevel;
      }).length;

      return dwarfKingKills + frameDwarfKingKills;
    }, 0);

    return Number(dwarfKingKills >= 5);
  },
};

export default dwarfKing;
