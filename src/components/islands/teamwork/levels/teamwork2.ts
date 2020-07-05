import { Level } from '../../../levels/types';
import { TeamworkIcon, TeamworkMarker } from '../../../levels/teamwork';
import teamwork3 from './teamwork3';
import { battery, bloodBrothers, chaliceOfRecovery } from '../../../trophies';

const teamwork2: Level = {
  island: 'teamwork',
  name: 'teamwork2',
  title: 'Teamwork island Lvl. 2',
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [battery, bloodBrothers, chaliceOfRecovery],
  unlocksLevels: [teamwork3],
};

export default teamwork2;
