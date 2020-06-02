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
import * as combatTrophies from '../../trophies/combat';
import * as epicTrophies from '../../trophies/epic';
import * as hubTrophies from '../../trophies/hub';
import * as objectivesTrophies from '../../trophies/objectives';
import * as skillsTrophies from '../../trophies/skills';
import * as specialTrophies from '../../trophies/special';
import * as teamworkTrophies from '../../trophies/teamwork';

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
          trophiesMax={Object.keys(hubTrophies).length}
          trophiesCount={
            account?.trophies.filter((trophy) => trophy.island === 'hub').length
          }
        />
        <CollectionItem
          title="Combat"
          Progress={CombatProgress}
          trophiesMax={Object.keys(combatTrophies).length}
          trophiesCount={
            account?.trophies.filter((trophy) => trophy.island === 'combat')
              .length
          }
        />
        <CollectionItem
          title="Skills"
          Progress={SkillsProgress}
          trophiesMax={Object.keys(skillsTrophies).length}
          trophiesCount={
            account?.trophies.filter((trophy) => trophy.island === 'skills')
              .length
          }
        />
        <CollectionItem
          title="Teamwork"
          Progress={TeamworkProgress}
          trophiesMax={Object.keys(teamworkTrophies).length}
          trophiesCount={
            account?.trophies.filter((trophy) => trophy.island === 'teamwork')
              .length
          }
        />
        <CollectionItem
          title="Objectives"
          Progress={ObjectivesProgress}
          trophiesMax={Object.keys(objectivesTrophies).length}
          trophiesCount={
            account?.trophies.filter((trophy) => trophy.island === 'objectives')
              .length
          }
        />
        <CollectionItem
          title="Epic"
          Progress={EpicProgress}
          trophiesMax={Object.keys(epicTrophies).length}
          trophiesCount={
            account?.trophies.filter((trophy) => trophy.island === 'epic')
              .length
          }
        />
        <CollectionItem
          title="Special"
          Progress={SpecialProgress}
          trophiesMax={Object.keys(specialTrophies).length}
          trophiesCount={
            account?.trophies.filter((trophy) => trophy.island === 'special')
              .length
          }
        />
      </Items>
    </>
  );
};

export default Collection;
