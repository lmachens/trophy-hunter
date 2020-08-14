import { Level } from '../../../levels/types';
import { TeamworkIcon, TeamworkMarker } from '../../../levels/teamwork';
import teamwork6 from './teamwork6';
import { theGuard, unbreakableWill } from '../../../trophies';

const teamwork5: Level = {
  island: 'teamwork',
  name: 'teamwork5',
  title: 'Teamwork island Lvl. 5',
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [theGuard, unbreakableWill],
  unlocksLevels: [teamwork6],
};

export default teamwork5;
