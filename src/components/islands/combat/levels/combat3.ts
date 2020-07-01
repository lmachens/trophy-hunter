import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import combat4 from './combat4';
import {
  dwarfKing,
  overload,
  revenge,
  soulHarvest,
  towerdive,
  trinityForce,
  vengeance,
  clothArmor,
  uncounterable,
} from '../../../trophies';

const combat3: Level = {
  island: 'combat',
  name: 'combat3',
  title: 'Combat island Lvl. 3',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    dwarfKing,
    overload,
    revenge,
    soulHarvest,
    towerdive,
    trinityForce,
    vengeance,
    clothArmor,
    uncounterable,
  ],
  unlocksLevels: [combat4],
};

export default combat3;
