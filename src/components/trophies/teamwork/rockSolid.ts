import { Trophy } from '../types';
import {
  getParticipantByAccount,
  getOpponents,
} from '../../../api/riot/helpers';

const rockSolid: Trophy = {
  island: 'teamworkIsland',
  name: 'rockSolid',
  level: 'teamwork8',
  title: 'Rock Solid',
  description:
    'Counterpick: Win a game as Malphite where the opponent team dealt at least 60% physical damage to champions.',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    const opponents = getOpponents(match, participant);

    const physicalDamageTotal = opponents
      .map((p) => p.stats.physicalDamageDealtToChampions)
      .reduce((memo, num) => memo + num);
    const magicalDamageTotal = opponents
      .map((p) => p.stats.magicDamageDealtToChampions)
      .reduce((memo, num) => memo + num);
    const trueDamageTotal = opponents
      .map((p) => p.stats.trueDamageDealtToChampions)
      .reduce((memo, num) => memo + num);

    const opponentsPhysicalDamageRatio =
      physicalDamageTotal /
      (physicalDamageTotal + magicalDamageTotal + trueDamageTotal + 1);

    return Number(
      opponentsPhysicalDamageRatio > 0.6 &&
        participant.stats.win &&
        participant.championId === 54
    );
  },
};

export default rockSolid;
