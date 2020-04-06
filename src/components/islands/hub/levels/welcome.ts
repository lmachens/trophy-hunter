import { Level } from '../../../levels/types';
import { HubIcon, HubMarker } from '../../../levels/hub';
import { playstyle } from '../../../trophies/hub';

const welcome: Level = {
  island: 'hub',
  name: 'welcome',
  title: 'Welcome to Trophy Hunter',
  Icon: HubIcon,
  Marker: HubMarker,
  trophies: [playstyle]
};

export default welcome;
