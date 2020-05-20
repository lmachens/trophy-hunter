import { Level } from '../../../levels/types';
import { EpicIcon, EpicMarker } from '../../../levels/epic';
import { epic1 } from '../../epic/levels';

const epic: Level = {
  island: 'hub',
  name: 'epic',
  title: 'Epic',
  Icon: EpicIcon,
  Marker: EpicMarker,
  trophies: [
    /* */
  ],
  unlocksLevels: [epic1],
};

export default epic;
