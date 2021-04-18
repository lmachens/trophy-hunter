import { Trophy } from '../types';
import { getTeammates } from '../../../api/riot/helpers';

const EZREAL_ID = 81;
const LUX_ID = 99;
const TWISTEDFATE_ID = 4;
const EVELYNN_ID = 28;
const RUMBLE_ID = 68;
const TRISTANA_ID = 18;
const GAREN_ID = 86;
const KATARINA_ID = 55;
const TARIC_ID = 44;
const XAYAH_ID = 498;
const RAKAN_ID = 497;

const valentineCombinations = {
  [EZREAL_ID]: [LUX_ID, TARIC_ID],
  [LUX_ID]: [EZREAL_ID],
  [TWISTEDFATE_ID]: [EVELYNN_ID],
  [EVELYNN_ID]: [TWISTEDFATE_ID],
  [RUMBLE_ID]: [TRISTANA_ID],
  [TRISTANA_ID]: [RUMBLE_ID],
  [GAREN_ID]: [KATARINA_ID],
  [KATARINA_ID]: [GAREN_ID],
  [TARIC_ID]: [EZREAL_ID],
  [XAYAH_ID]: [RAKAN_ID],
  [RAKAN_ID]: [XAYAH_ID],
};

const valentines: Trophy = {
  island: 'special',
  name: 'valentines',
  level: 'special2',
  title: 'Valentines',
  description:
    "It's about love and romance. Pick a champion who likes to flirt with one of your teammates.",
  category: 'special',
  aramSupport: true,
  checkProgress: ({ participant, match }) => {
    const valentineCombination: number[] | undefined =
      valentineCombinations[participant.championId];
    if (!valentineCombination) {
      return 0;
    }
    const teammates = getTeammates(match, participant);
    if (
      teammates.some((teammate) =>
        valentineCombination.includes(teammate.championId)
      )
    ) {
      return 1;
    }
    return 0;
  },
};

export default valentines;
