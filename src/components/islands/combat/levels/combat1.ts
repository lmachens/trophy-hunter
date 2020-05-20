import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import { firstBlood, flail } from '../../../trophies/combat';

const combat1: Level = {
  island: 'combat',
  name: 'combat1',
  title: 'Combat island Lvl. 1',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [firstBlood, flail],
};

export default combat1;
