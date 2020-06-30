import { Trophy } from '../types';
import { isInEnemyTurretRange } from '../../../api/riot/helpers';
import { MatchEvent } from '../../../api/riot/types';

const towerdive: Trophy = {
  island: 'combatIsland',
  name: 'towerdive',
  level: 'combat3',
  title: 'Towerdive',
  description:
    'Kill an opponent underneath his turret before the first turret falls without dying in the next 10 seconds ',
  category: 'combat',
  checkProgress: ({ match, timeline, account }) => {
    const participantIdentity = match.participantIdentities.find(
      (participantIdentity) =>
        participantIdentity.player.accountId === account.summoner.accountId
    );
    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );

    const { deaths, kills, firstTurrentDeath } = timeline.frames.reduce<{
      deaths: MatchEvent[];
      kills: MatchEvent[];
      firstTurrentDeath: MatchEvent;
    }>(
      (current, frame) => ({
        deaths: [
          ...current.deaths,
          ...frame.events.filter(
            (event) =>
              event.type === 'CHAMPION_KILL' &&
              event.victimId === participantIdentity.participantId
          ),
        ],
        kills: [
          ...current.kills,
          ...frame.events.filter(
            (event) =>
              event.type === 'CHAMPION_KILL' &&
              event.killerId === participantIdentity.participantId
          ),
        ],
        firstTurrentDeath:
          current.firstTurrentDeath ||
          frame.events.find(
            (event) =>
              event.type === 'BUILDING_KILL' &&
              event.buildingType === 'TOWER_BUILDING'
          ),
      }),
      { deaths: [], kills: [], firstTurrentDeath: null }
    );

    const hasUnderTurretKill = !!kills.find((kill) => {
      const preFirstTurretDeath = kill.timestamp <= firstTurrentDeath.timestamp;
      const isUnderTurret = isInEnemyTurretRange(
        kill.position,
        participant.teamId
      );
      const notDiedInThe10SecsBeforeOrAfter = !deaths.find(
        (death) =>
          death.timestamp + 10000 >= kill.timestamp &&
          death.timestamp - 10000 < kill.timestamp
      );

      return (
        isUnderTurret && preFirstTurretDeath && notDiedInThe10SecsBeforeOrAfter
      );
    });

    return Number(hasUnderTurretKill);
  },
};

export default towerdive;
