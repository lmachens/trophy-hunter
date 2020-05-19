import { FC } from 'react';
import styled from '@emotion/styled';
import CollectionItem from './CollectionItem';
import CombatProgress from '../../trophies/combat/CombatProgress';
import HubProgress from '../../trophies/hub/HubProgress';
import SkillsProgress from '../../trophies/skills/SkillsProgress';
import TeamworkProgress from '../../trophies/teamwork/TeamworkProgress';
import ObjectivesProgress from '../../trophies/objectives/ObjectivesProgress';
import EpicProgress from '../../trophies/epic/EpicProgress';
import SpecialProgress from '../../trophies/special/SpecialProgress';
import { useAccount } from '../../../contexts/account';

const Items = styled.div`
  display: flex;
  font-family: 'Roboto Mono', monospace;
  width: calc(100% - 436px);
  justify-content: space-evenly;
`;

const Collection: FC = () => {
  const { account } = useAccount();
  return (
    <>
      <h2>My Collection</h2>
      <Items>
        <CollectionItem
          title="Origin"
          Progress={HubProgress}
          trophiesMax={1}
          trophiesCount={account?.islands.hubIsland?.trophiesCount}
        />
        <CollectionItem
          title="Combat"
          Progress={CombatProgress}
          trophiesMax={60}
          trophiesCount={account?.islands.combatIsland?.trophiesCount}
        />
        <CollectionItem
          title="Skills"
          Progress={SkillsProgress}
          trophiesMax={31}
          trophiesCount={account?.islands.skillsIsland?.trophiesCount}
        />
        <CollectionItem
          title="Teamwork"
          Progress={TeamworkProgress}
          trophiesMax={54}
          trophiesCount={account?.islands.teamworkIsland?.trophiesCount}
        />
        <CollectionItem
          title="Objectives"
          Progress={ObjectivesProgress}
          trophiesMax={21}
          trophiesCount={account?.islands.objectivesIsland?.trophiesCount}
        />
        <CollectionItem
          title="Epic"
          Progress={EpicProgress}
          trophiesMax={25}
          trophiesCount={account?.islands.epicIsland?.trophiesCount}
        />
        <CollectionItem
          title="Special"
          Progress={SpecialProgress}
          trophiesMax={15}
          trophiesCount={account?.islands.specialIsland?.trophiesCount}
        />
      </Items>
    </>
  );
};

export default Collection;
