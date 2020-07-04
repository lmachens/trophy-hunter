import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import combat5 from './combat5';
import {
  blitzkrieg,
  cursedGrounds,
  shockwave,
  silverBullets,
  snowball,
  unleashThePower,
  wizard,
  explosive,
} from '../../../trophies';

const combat4: Level = {
  island: 'combat',
  name: 'combat4',
  title: 'Combat island Lvl. 4',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    blitzkrieg,
    cursedGrounds,
    shockwave,
    silverBullets,
    snowball,
    unleashThePower,
    wizard,
    explosive,
  ],
  unlocksLevels: [combat5],
};

export default combat4;
