import { Level } from '../../../levels/types';
import { HubIcon, HubMarker } from '../../../levels/hub';
import { playstyle } from '../../../trophies';
import hubCombat from './hubCombat';
import hubEpic from './hubEpic';
import hubObjectives from './hubObjectives';
import hubSkills from './hubSkills';
import hubSpecial from './hubSpecial';
import hubTeamwork from './hubTeamwork';

const welcome: Level = {
  island: 'hub',
  name: 'welcome',
  title: 'Welcome to Trophy Hunter',
  Icon: HubIcon,
  Marker: HubMarker,
  trophies: [playstyle],
  unlocksLevels: [
    hubCombat,
    hubEpic,
    hubObjectives,
    hubSkills,
    hubSpecial,
    hubTeamwork,
  ],
};

export default welcome;
