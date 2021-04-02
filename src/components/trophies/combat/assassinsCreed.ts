import { getParticipantSoloKills } from '../../../api/riot/helpers';
import { Trophy } from '../types';

const assassinsCreed: Trophy = {
  island: 'combat',
  name: 'assassinsCreed',
  level: 'combat6',
  title: 'Assassins Creed',
  description: 'Achieve seven solo kills.',
  category: 'combat',
  checkProgress: ({ events, participant }) => {
    const soloKills = getParticipantSoloKills(events, participant.participantId)
      .length;
    return soloKills / 7;
  },
  checkLive: ({ events, account }) => {
    const soloKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.Assisters.length === 0
    ).length;
    return soloKills / 7;
  },
};

export default assassinsCreed;
