import { Level } from '../../../levels/types';
import { TeamworkIcon, TeamworkMarker } from '../../../levels/teamwork';
import teamwork4 from './teamwork4';
import { dusk } from '../../../trophies';

const teamwork3: Level = {
  island: 'teamwork',
  name: 'teamwork3',
  title: 'Teamwork island Lvl. 3',
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [dusk],
  unlocksLevels: [teamwork4],
};

export default teamwork3;
