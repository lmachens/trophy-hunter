import { Trophy } from '../types';
import { getOpponents } from '../../../api/riot/helpers';

const rockSolid: Trophy = {
  island: 'teamwork',
  name: 'rockSolid',
  level: 'teamwork8',
  title: 'Rock Solid',
  description:
    'Counterpick: Win a game as Malphite where the opponent team dealt at least 60% physical damage to champions.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
    const opponents = getOpponents(match, participant);

    const physicalDamageTotal = opponents
      .map((p) => p.physicalDamageDealtToChampions)
      .reduce((memo, num) => memo + num);
    const magicalDamageTotal = opponents
      .map((p) => p.magicDamageDealtToChampions)
      .reduce((memo, num) => memo + num);
    const trueDamageTotal = opponents
      .map((p) => p.trueDamageDealtToChampions)
      .reduce((memo, num) => memo + num);

    const opponentsPhysicalDamageRatio =
      physicalDamageTotal /
      (physicalDamageTotal + magicalDamageTotal + trueDamageTotal + 1);

    return Number(
      opponentsPhysicalDamageRatio > 0.6 &&
        participant.win &&
        participant.championId === 54
    );
  },
};

export default rockSolid;
