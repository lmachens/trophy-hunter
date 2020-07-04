import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import combat7 from './combat7';
import { assassinsCreed } from '../../../trophies';

const combat6: Level = {
  island: 'combat',
  name: 'combat6',
  title: 'Combat island Lvl. 6',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [assassinsCreed],
  unlocksLevels: [combat7],
};

export default combat6;
