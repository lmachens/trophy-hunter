import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import combat7 from './combat7';
import {
  assassinsCreed,
  curtainCall,
  darkinBlade,
  deadlyShadow,
  grimReaper,
} from '../../../trophies';

const combat6: Level = {
  island: 'combat',
  name: 'combat6',
  title: 'Combat island Lvl. 6',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    assassinsCreed,
    curtainCall,
    darkinBlade,
    deadlyShadow,
    grimReaper,
  ],
  unlocksLevels: [combat7],
};

export default combat6;
