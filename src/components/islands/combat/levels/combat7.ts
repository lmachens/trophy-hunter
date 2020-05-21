import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import combat8 from './combat8';

const combat7: Level = {
  island: 'combat',
  name: 'combat7',
  title: 'Combat island Lvl. 7',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    /* */
  ],
  unlocksLevels: [combat8],
};

export default combat7;
