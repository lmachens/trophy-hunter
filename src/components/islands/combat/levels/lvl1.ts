import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import { firstBlood, flail } from '../../../trophies/combat';

const lvl1: Level = {
  island: 'combat',
  name: 'lvl1',
  title: 'Combat island Lvl. 1',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [firstBlood, flail]
};

export default lvl1;
