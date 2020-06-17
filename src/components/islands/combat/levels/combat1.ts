import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import { firstBlood, flail, keyTargets, skullHunter } from '../../../trophies';
import combat2 from './combat2';

const combat1: Level = {
  island: 'combat',
  name: 'combat1',
  title: 'Combat island Lvl. 1',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [firstBlood, flail, keyTargets, skullHunter],
  unlocksLevels: [combat2],
};

export default combat1;
