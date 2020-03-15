import { NextPage } from 'next';
import Main from '../common/Main';
import Overview from '../common/Overview';
import Islands from '../common/Islands';
import CombatIsland from '../islands/CombatIsland';
import SkillsIsland from '../islands/SkillsIsland';
import TeamWorkIsland from '../islands/TeamWorkIsland';
import SpecialIsland from '../islands/SpecialIsland';
import EpicIsland from '../islands/EpicIsland';
import ObjectivesIsland from '../islands/ObjectivesIsland';
import EyeIsland from '../islands/EyeIsland';
import styled from '@emotion/styled';
import IslandDetails from '../common/IslandDetails';
import { useState } from 'react';
import { transformIsland } from '../islands/utils';

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
    name: 'eyeIsland',
    top: 250,
    left: 270,
    Component: EyeIsland
  })
];

const SizeContainer = styled.div`
  position: absolute;
  width: 820px;
  height: 720px;
  transition: 0.15s;
  margin: 30px;
`;

const LeagueOfLegends: NextPage = () => {
  const [activeIsland, setActiveIsland] = useState(null);

  return (
    <Main>
      <Islands>
        <SizeContainer
          style={{
            left: `${-activeIsland?.left || 0}px`,
            top: `${-activeIsland?.top || 0}px`,
            marginTop: `${activeIsland ? 100 : 30}px`
          }}
        >
          {islands.map(({ name, top, left, Component }) => (
            <Component
              key={name}
              onClick={() => setActiveIsland({ name, top, left })}
            />
          ))}
        </SizeContainer>
      </Islands>
      <IslandDetails
        island={activeIsland}
        onHide={() => setActiveIsland(null)}
      />
      <Overview />
    </Main>
  );
};

export default LeagueOfLegends;
