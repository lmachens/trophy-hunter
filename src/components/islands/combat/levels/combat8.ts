import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import { sniper, gloriousEvolution, giantsBelt } from '../../../trophies';

const combat8: Level = {
  island: 'combat',
  name: 'combat8',
  title: 'Combat island Lvl. 8',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [sniper, gloriousEvolution, giantsBelt],
  unlocksLevels: [],
};

export default combat8;
