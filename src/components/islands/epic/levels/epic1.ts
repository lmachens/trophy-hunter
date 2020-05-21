import { Level } from '../../../levels/types';
import { EpicIcon, EpicMarker } from '../../../levels/epic';
import epic2 from './epic2';

const epic1: Level = {
  island: 'epic',
  name: 'epic1',
  title: 'Epic island Lvl. 1',
  Icon: EpicIcon,
  Marker: EpicMarker,
  trophies: [],
  unlocksLevels: [epic2],
};

export default epic1;
