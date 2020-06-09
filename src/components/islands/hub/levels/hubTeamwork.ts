import { Level } from '../../../levels/types';
import { TeamworkIcon, TeamworkMarker } from '../../../levels/teamwork';
import { teamwork1 } from '../../teamwork/levels';
import { theElephant, comradeInArms, feedThem } from '../../../trophies';

const hubTeamwork: Level = {
  island: 'hub',
  name: 'hubTeamwork',
  title: 'Teamwork',
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [comradeInArms, feedThem, theElephant],
  unlocksLevels: [teamwork1],
};

export default hubTeamwork;
