import { Level } from '../../../levels/types';
import { HubIcon, HubMarker } from '../../../levels/hub';
import { playstyle } from '../../../trophies/hub';
import combat from './combat';
import epic from './epic';
import objectives from './objectives';
import skills from './skills';
import special from './special';
import teamwork from './teamwork';

const welcome: Level = {
  island: 'hub',
  name: 'welcome',
  title: 'Welcome to Trophy Hunter',
  Icon: HubIcon,
  Marker: HubMarker,
  trophies: [playstyle],
  unlocksLevels: [combat, epic, objectives, skills, special, teamwork],
};

export default welcome;
