import { Level } from '../../../levels/types';
import { TeamworkIcon, TeamworkMarker } from '../../../levels/teamwork';
import teamwork4 from './teamwork4';
import {
  dusk,
  greyEminence,
  highSociety,
  lifeAndDeath,
} from '../../../trophies';

const teamwork3: Level = {
  island: 'teamwork',
  name: 'teamwork3',
  title: 'Teamwork island Lvl. 3',
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [dusk, greyEminence, highSociety, lifeAndDeath],
  unlocksLevels: [teamwork4],
};

export default teamwork3;
