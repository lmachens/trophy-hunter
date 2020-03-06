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

const CombatIslandPositioned = styled(CombatIsland)`
  position: absolute;
  top: 100px;
  left: 30px;
`;

const SkillsIslandPositioned = styled(SkillsIsland)`
  position: absolute;
  top: 60px;
  left: 300px;
`;
const TeamWorkIslandPositioned = styled(TeamWorkIsland)`
  position: absolute;
  top: 100px;
  left: 540px;
`;
const SpecialIslandPositioned = styled(SpecialIsland)`
  position: absolute;
  top: 380px;
  left: 30px;
`;
const EpicIslandPositioned = styled(EpicIsland)`
  position: absolute;
  top: 490px;
  left: 280px;
`;
const ObjectivesIslandPositioned = styled(ObjectivesIsland)`
  position: absolute;
  top: 370px;
  left: 530px;
`;
const EyeIslandPositioned = styled(EyeIsland)`
  position: absolute;
  top: 280px;
  left: 300px;
`;

const LeagueOfLegends: NextPage = () => {
  return (
    <Main>
      <Islands>
        <CombatIslandPositioned />
        <SkillsIslandPositioned />
        <TeamWorkIslandPositioned />
        <SpecialIslandPositioned />
        <EpicIslandPositioned />
        <ObjectivesIslandPositioned />
        <EyeIslandPositioned />
      </Islands>
      <Overview />
    </Main>
  );
};

export default LeagueOfLegends;
