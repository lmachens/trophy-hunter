import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import combat3 from './combat3';
import {
  burningComet,
  david,
  deadlyVenom,
  deathMarks,
  duelist,
  smartness,
  spinningBlades,
  bombardment,
} from '../../../trophies';

const combat2: Level = {
  island: 'combat',
  name: 'combat2',
  title: 'Combat island Lvl. 2',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    bombardment,
    burningComet,
    david,
    deadlyVenom,
    deathMarks,
    duelist,
    smartness,
    spinningBlades,
  ],
  unlocksLevels: [combat3],
};

export default combat2;
