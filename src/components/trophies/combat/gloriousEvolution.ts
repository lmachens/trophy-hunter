import { Trophy } from '../types';
import { getParticipantDeaths } from '../../../api/riot/helpers';

const gloriousEvolution: Trophy = {
  island: 'combat',
  name: 'gloriousEvolution',
  level: 'combat8',
  title: 'Glorious Evolution',
  description:
    'Win a 30+ minute game, where you dealt most damage and did not die in the last 5 minutes of the game.',
  category: 'combat',
  checkProgress: ({ match, events, participant }) => {
    const maxDamage = Math.max(
      ...match.info.participants.map(
        (participant) => participant.totalDamageDealtToChampions
      )
    );

    const deaths = getParticipantDeaths(events, participant.participantId);
    const gameLongEnough = match.info.gameDuration > 30 * 60;
    const mostDamage = participant.totalDamageDealtToChampions === maxDamage;
    const notDieAfter30Minutes = deaths.every(
      (death) => death.timestamp < match.info.gameDuration * 1000 - 300000
    );
    return Number(gameLongEnough && mostDamage && notDieAfter30Minutes);
  },
};

export default gloriousEvolution;
