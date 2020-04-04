import { NextPage } from 'next';
import Islands from '../common/Islands';
import CombatIsland from '../islands/CombatIsland';
import SkillsIsland from '../islands/SkillsIsland';
import TeamWorkIsland from '../islands/TeamWorkIsland';
import SpecialIsland from '../islands/SpecialIsland';
import EpicIsland from '../islands/EpicIsland';
import ObjectivesIsland from '../islands/ObjectivesIsland';
import HubIsland from '../islands/HubIsland';
import styled from '@emotion/styled';
import { transformIsland, UserIslands } from '../islands/utils';

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
    name: 'teamWorkIsland',
    top: 70,
    left: 510,
    Component: TeamWorkIsland
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

type IslandProps = {
  name: string;
  top: number;
  left: number;
};

interface GamePageProps {
  activeIsland: IslandProps;
  onIslandClick(island: IslandProps): void;
  userIslands: UserIslands;
}

const LeagueOfLegends: NextPage<GamePageProps> = ({
  activeIsland,
  onIslandClick,
  userIslands
}) => {
  return (
    <Islands>
      <SizeContainer
        style={{
          left: `${-activeIsland?.left || 0}px`,
          top: `${-activeIsland?.top || 0}px`,
          marginTop: `${activeIsland ? 100 : 30}px`
        }}
      >
        {islands.map(({ name, top, left, Component }) => {
          const { status, levels } = userIslands[name] || {
            status: 'closed',
            levels: {}
          };
          return (
            <Component
              key={name}
              onClick={() => onIslandClick({ name, top, left })}
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
