import { Trophy } from '../types';

const invade: Trophy = {
  island: 'teamwork',
  name: 'invade',
  level: 'teamwork6',
  title: 'INVADE!!!',
  description: 'Participate in a kill before minions spawn (75 sec).',
  category: 'teamwork',
  checkProgress: ({ events, participant }) => {
    const hasInvadeKillParticipation = events.some(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.timestamp < 75000 &&
        (event.killerId === participant.participantId ||
          event.assistingParticipantIds.includes(participant.participantId))
    );

    return Number(hasInvadeKillParticipation);
  },
  checkLive: ({ events, account }) => {
    const hasInvadeKillParticipation = events.some(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.EventTime < 75 &&
        (event.VictimName === account.summoner.name ||
          event.Assisters.includes(account.summoner.name))
    );

    return Number(hasInvadeKillParticipation);
  },
};

export default invade;
