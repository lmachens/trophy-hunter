import { Level } from '../../../levels/types';
import { EpicIcon, EpicMarker } from '../../../levels/epic';
import epic2 from './epic2';
import {
  firstBloodKing,
  mafiaBoss,
  pentaKill,
  pesticide,
  phoenixStance,
} from '../../../trophies';

const epic1: Level = {
  island: 'epic',
  name: 'epic1',
  title: 'Epic island Lvl. 1',
  Icon: EpicIcon,
  Marker: EpicMarker,
  trophies: [firstBloodKing, mafiaBoss, pentaKill, pesticide, phoenixStance],
  unlocksLevels: [epic2],
};

export default epic1;
