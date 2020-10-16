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
import * as trophies from '../../trophies';

const Items = styled.div`
  display: flex;
  font-family: 'Roboto Mono', monospace;
  justify-content: space-evenly;
  overflow: auto;
`;

const Collection: FC = () => {
  const { account } = useAccount();
  const completedTrophies =
    account?.trophies.filter((accountTrophy) => accountTrophy.progress === 1) ||
    [];

  return (
    <>
      <h2>My Collection</h2>
      <Items>
        <CollectionItem
          title="Origin"
          Progress={HubProgress}
          trophiesMax={Object.keys(hubTrophies).length}
          trophiesCount={
            completedTrophies.filter(
              (accountTrophy) =>
                accountTrophy.progress === 1 &&
                trophies[accountTrophy.name].category === 'welcome'
            ).length
          }
        />
        <CollectionItem
          title="Combat"
          Progress={CombatProgress}
          trophiesMax={Object.keys(combatTrophies).length}
          trophiesCount={
            completedTrophies.filter(
              (accountTrophy) =>
                trophies[accountTrophy.name].category === 'combat'
            ).length
          }
        />
        <CollectionItem
          title="Skills"
          Progress={SkillsProgress}
          trophiesMax={Object.keys(skillsTrophies).length}
          trophiesCount={
            completedTrophies.filter(
              (accountTrophy) =>
                trophies[accountTrophy.name].category === 'skills'
            ).length
          }
        />
        <CollectionItem
          title="Teamwork"
          Progress={TeamworkProgress}
          trophiesMax={Object.keys(teamworkTrophies).length}
          trophiesCount={
            completedTrophies.filter(
              (accountTrophy) =>
                trophies[accountTrophy.name].category === 'teamwork'
            ).length
          }
        />
        <CollectionItem
          title="Objectives"
          Progress={ObjectivesProgress}
          trophiesMax={Object.keys(objectivesTrophies).length}
          trophiesCount={
            completedTrophies.filter(
              (accountTrophy) =>
                trophies[accountTrophy.name].category === 'objectives'
            ).length
          }
        />
        <CollectionItem
          title="Epic"
          Progress={EpicProgress}
          trophiesMax={Object.keys(epicTrophies).length}
          trophiesCount={
            completedTrophies.filter(
              (accountTrophy) =>
                trophies[accountTrophy.name].category === 'epic'
            ).length
          }
        />
        <CollectionItem
          title="Special"
          Progress={SpecialProgress}
          trophiesMax={Object.keys(specialTrophies).length}
          trophiesCount={
            completedTrophies.filter(
              (accountTrophy) =>
                trophies[accountTrophy.name].category === 'special'
            ).length
          }
        />
      </Items>
    </>
  );
};

export default Collection;
