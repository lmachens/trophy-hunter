import { Level } from '../../../levels/types';
import { EpicIcon, EpicMarker } from '../../../levels/epic';
import { epic1 } from '../../epic/levels';
import { darkness, sweetHoney } from '../../../trophies';

const hubEpic: Level = {
  island: 'hub',
  name: 'hubEpic',
  title: 'Epic',
  Icon: EpicIcon,
  Marker: EpicMarker,
  trophies: [darkness, sweetHoney],
  unlocksLevels: [epic1],
};

export default hubEpic;
