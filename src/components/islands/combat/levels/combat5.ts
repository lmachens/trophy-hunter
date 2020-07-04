import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import combat6 from './combat6';
import {
  bloodThirst,
  livingArtillery,
  machete,
  sai,
  theFinalHour,
  theZombie,
} from '../../../trophies';

const combat5: Level = {
  island: 'combat',
  name: 'combat5',
  title: 'Combat island Lvl. 5',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    bloodThirst,
    livingArtillery,
    machete,
    sai,
    theFinalHour,
    theZombie,
  ],
  unlocksLevels: [combat6],
};

export default combat5;
