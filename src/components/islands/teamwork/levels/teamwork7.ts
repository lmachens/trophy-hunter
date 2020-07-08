import { Level } from '../../../levels/types';
import { TeamworkIcon, TeamworkMarker } from '../../../levels/teamwork';
import teamwork8 from './teamwork8';
import { healer } from '../../../trophies';

const teamwork7: Level = {
  island: 'teamwork',
  name: 'teamwork7',
  title: 'Teamwork island Lvl. 7',
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [healer],
  unlocksLevels: [teamwork8],
};

export default teamwork7;
