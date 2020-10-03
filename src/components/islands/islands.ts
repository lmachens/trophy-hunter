import {
  CombatIsland,
  SkillsIsland,
  HubIsland,
  TeamworkIsland,
  SpecialIsland,
  EpicIsland,
  ObjectivesIsland,
} from '.';
import { transformIsland } from './utils';

const islands = [
  transformIsland({
    name: 'combat',
    top: 56,
    left: 0,
    Component: CombatIsland,
    centerTop: 0,
    centerLeft: 0,
  }),
  transformIsland({
    name: 'skills',
    top: 8,
    left: 285,
    Component: SkillsIsland,
    centerTop: 0,
    centerLeft: 140,
  }),
  transformIsland({
    name: 'teamwork',
    top: 20,
    left: 535,
    Component: TeamworkIsland,
    centerTop: 0,
    centerLeft: 350,
  }),
  transformIsland({
    name: 'special',
    top: 320,
    left: 0,
    Component: SpecialIsland,
    centerTop: 0,
    centerLeft: 0,
  }),
  transformIsland({
    name: 'epic',
    top: 460,
    left: 260,
    Component: EpicIsland,
    centerTop: 0,
    centerLeft: 140,
  }),
  transformIsland({
    name: 'objectives',
    top: 295,
    left: 530,
    Component: ObjectivesIsland,
    centerTop: 0,
    centerLeft: 350,
  }),
  transformIsland({
    name: 'hub',
    top: 250,
    left: 275,
    Component: HubIsland,
    centerTop: 0,
    centerLeft: 140,
  }),
];

export default islands;
