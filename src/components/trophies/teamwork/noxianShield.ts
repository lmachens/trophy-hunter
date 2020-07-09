import { Trophy } from '../types';
import {
  getParticipantByAccount,
  getTeammates,
} from '../../../api/riot/helpers';

const noxianShield: Trophy = {
  island: 'teamworkIsland',
  name: 'noxianShield',
  level: 'teamwork3',
  title: 'Noxian Shield',
  description:
    'Tank most damage of your team while having the least number of deaths of your team.',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    const teammates = getTeammates(match, participant);
    const minTeamDeaths = Math.min(
      ...teammates.map((participant) => participant.stats.deaths)
    );

    const maxTeamDamageTanked = Math.max(
      ...teammates.map(
        (participant) =>
          participant.stats.totalDamageTaken +
          participant.stats.damageSelfMitigated
      )
    );

    const hasLeastDeaths = participant.stats.deaths <= minTeamDeaths;
    const hasMostTankedDamage =
      participant.stats.totalDamageTaken +
        participant.stats.damageSelfMitigated >=
      maxTeamDamageTanked;
    return Number(hasLeastDeaths && hasMostTankedDamage);
  },
};

export default noxianShield;
