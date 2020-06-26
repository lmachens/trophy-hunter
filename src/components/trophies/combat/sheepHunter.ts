import { Trophy } from '../types';
import { MatchEvent } from '../../../api/riot/types';

const sheepHunter: Trophy = {
  island: 'combatIsland',
  name: 'sheepHunter',
  level: 'combat2',
  title: 'Sheep Hunter',
  description: 'Kill five opponents who are at least two levels below you.',
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

    const sheepKills = timeline.frames.reduce((sheepKills, frame) => {
      const frameSheepKills = frame.events.filter((event) => {
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
        const levelDiff = killerLevel - victimLevel;

        return levelDiff >= 2;
      }).length;

      return sheepKills + frameSheepKills;
    }, 0);

    return Number(sheepKills >= 5);
  },
};

export default sheepHunter;
