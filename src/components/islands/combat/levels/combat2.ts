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
} from '../../../trophies';

const combat2: Level = {
  island: 'combat',
  name: 'combat2',
  title: 'Combat island Lvl. 2',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [burningComet, david, deadlyVenom, deathMarks, duelist, smartness],
  unlocksLevels: [combat3],
};

export default combat2;
