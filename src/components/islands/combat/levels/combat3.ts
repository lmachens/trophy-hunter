import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import combat4 from './combat4';
import { dwarfKing } from '../../../trophies';

const combat3: Level = {
  island: 'combat',
  name: 'combat3',
  title: 'Combat island Lvl. 3',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [dwarfKing],
  unlocksLevels: [combat4],
};

export default combat3;
