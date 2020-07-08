import { Level } from '../../../levels/types';
import { TeamworkIcon, TeamworkMarker } from '../../../levels/teamwork';
import teamwork7 from './teamwork7';
import {
  annihilation,
  bigBrother,
  guardianAngel,
  invade,
  lastResort,
} from '../../../trophies';

const teamwork6: Level = {
  island: 'teamwork',
  name: 'teamwork6',
  title: 'Teamwork island Lvl. 6',
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [annihilation, bigBrother, guardianAngel, invade, lastResort],
  unlocksLevels: [teamwork7],
};

export default teamwork6;
