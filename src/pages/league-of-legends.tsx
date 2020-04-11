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
import { transformIsland } from '../components/islands/utils';
import { Level } from '../components/levels/types';
import Background from '../components/islands/Background';
import { useUser } from '../contexts/user';

const islands = [
  transformIsland({
    name: 'combatIsland',
    top: 56,
    left: 0,
    Component: CombatIsland
  }),
  transformIsland({
    name: 'skillsIsland',
    top: 8,
    left: 285,
    Component: SkillsIsland
  }),
  transformIsland({
    name: 'teamworkIsland',
    top: 20,
    left: 535,
    Component: TeamworkIsland
  }),
  transformIsland({
    name: 'specialIsland',
    top: 320,
    left: 0,
    Component: SpecialIsland
  }),
  transformIsland({
    name: 'epicIsland',
    top: 460,
    left: 260,
    Component: EpicIsland
  }),
  transformIsland({
    name: 'objectivesIsland',
    top: 275,
    left: 530,
    Component: ObjectivesIsland
  }),
  transformIsland({
    name: 'hubIsland',
    top: 250,
    left: 275,
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
}

const LeagueOfLegends: NextPage<GamePageProps> = ({
  top,
  left,
  onLevelClick
}) => {
  const user = useUser();
  const userIslands = user?.islands || {};
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
        <Background />
      </SizeContainer>
    </Islands>
  );
};

export default LeagueOfLegends;
