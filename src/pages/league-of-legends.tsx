import { NextPage } from 'next';
import styled from '@emotion/styled';
import {
  Islands,
  CombatIsland,
  SkillsIsland,
  HubIsland,
  TeamworkIsland,
  SpecialIsland,
  EpicIsland,
  ObjectivesIsland
} from '../components/islands';
import { transformIsland, UserIslands } from '../components/islands/utils';
import { Level } from '../components/levels/types';

const islands = [
  transformIsland({
    name: 'combatIsland',
    top: 70,
    left: 0,
    Component: CombatIsland
  }),
  transformIsland({
    name: 'skillsIsland',
    top: 30,
    left: 270,
    Component: SkillsIsland
  }),
  transformIsland({
    name: 'teamworkIsland',
    top: 70,
    left: 510,
    Component: TeamworkIsland
  }),
  transformIsland({
    name: 'specialIsland',
    top: 350,
    left: 0,
    Component: SpecialIsland
  }),
  transformIsland({
    name: 'epicIsland',
    top: 460,
    left: 250,
    Component: EpicIsland
  }),
  transformIsland({
    name: 'objectivesIsland',
    top: 340,
    left: 500,
    Component: ObjectivesIsland
  }),
  transformIsland({
    name: 'hubIsland',
    top: 250,
    left: 270,
    Component: HubIsland
  })
];

const SizeContainer = styled.div`
  position: absolute;
  width: 820px;
  height: 720px;
  transition: 0.15s;
  margin: 30px;
`;

type TargetLevel = {
  islandName: string;
  level: Level;
  top: number;
  left: number;
};

interface GamePageProps {
  top: number;
  left: number;
  onLevelClick(targetLevel: TargetLevel): void;
  userIslands: UserIslands;
}

const LeagueOfLegends: NextPage<GamePageProps> = ({
  top,
  left,
  onLevelClick,
  userIslands
}) => {
  return (
    <Islands>
      <SizeContainer
        style={{
          left: `${-left || 0}px`,
          top: `${-top || 0}px`,
          marginTop: `${top ? 100 : 30}px`
        }}
      >
        {islands.map(({ name, top, left, Component: Island }) => {
          const { status, levels } = userIslands[name] || {
            status: 'closed',
            levels: {}
          };
          return (
            <Island
              key={name}
              onLevelClick={level =>
                onLevelClick({ islandName: name, level, top, left })
              }
              status={status}
              levels={levels}
            />
          );
        })}
      </SizeContainer>
    </Islands>
  );
};

export default LeagueOfLegends;
