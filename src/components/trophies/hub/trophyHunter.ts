import { Trophy } from '../types';
import CombatProgress from '../combat/CombatProgress';

const trophyHunter: Trophy = {
  island: 'hubIsland',
  name: 'trophyHunter',
  level: 'hubCombat',
  title: 'Trophy Hunter',
  description: 'Kill each unique enemy champion at least once.',
  ProgressIcon: CombatProgress,
  checkProgress: ({ match, timeline, account }) => {
    const participantIdentity = match.participantIdentities.find(
      (participantIdentity) =>
        participantIdentity.player.accountId === account.summoner.accountId
    );
    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );

    const uniqueKillIds = timeline.frames.reduce((current, frame) => {
      const participantKills = frame.events.filter(
        (event) =>
          event.type === 'CHAMPION_KILL' &&
          event.killerId === participant.participantId
      );
      if (participantKills.length === 0) {
        return current;
      }
      const newKillIds = participantKills.filter(
        (kill) => !current.includes(kill.victimId)
      );
      return [...current, ...newKillIds];
    }, []);

    return Number(uniqueKillIds.length === 5);
  },
  checkLive: ({ activeGame, account }) => {
    if (
      !activeGame.events.Events.length ||
      activeGame.trophyData.trophyHunter
    ) {
      return 0;
    }

    const championKills = activeGame.events.Events.reduce((current, event) => {
      if (
        event.EventName !== 'ChampionKill' ||
        event.KillerName !== account.summoner.name ||
        current.includes(event.VictimName)
      ) {
        return current;
      }
      return [...current, event.VictimName];
    }, []);

    return Number(championKills.length / 5);
  },
};

export default trophyHunter;
