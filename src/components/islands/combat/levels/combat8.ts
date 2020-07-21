import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import {
  sniper,
  gloriousEvolution,
  giantsBelt,
  quadraKill,
} from '../../../trophies';

const combat8: Level = {
  island: 'combat',
  name: 'combat8',
  title: 'Combat island Lvl. 8',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [sniper, gloriousEvolution, giantsBelt, quadraKill],
  unlocksLevels: [],
};

export default combat8;
