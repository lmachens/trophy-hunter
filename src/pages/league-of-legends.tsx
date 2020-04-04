import { NextPage } from 'next';
import styled from '@emotion/styled';
import Islands from '../components/islands/Islands';
import CombatIsland from '../components/islands/CombatIsland';
import SkillsIsland from '../components/islands/SkillsIsland';
import TeamWorkIsland from '../components/islands/TeamWorkIsland';
import SpecialIsland from '../components/islands/SpecialIsland';
import EpicIsland from '../components/islands/EpicIsland';
import ObjectivesIsland from '../components/islands/ObjectivesIsland';
import HubIsland from '../components/islands/HubIsland';
import { transformIsland, UserIslands } from '../components/islands/utils';

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
  onLevelClick(island: IslandProps): void;
  userIslands: UserIslands;
}

const LeagueOfLegends: NextPage<GamePageProps> = ({
  activeIsland,
  onLevelClick,
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
        {islands.map(({ name, top, left, Component: Island }) => {
          const { status, levels } = userIslands[name] || {
            status: 'closed',
            levels: {}
          };
          return (
            <Island
              key={name}
              onClick={() => onLevelClick({ name, top, left })}
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
