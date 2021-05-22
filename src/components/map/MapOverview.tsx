import { useState } from 'react';
import styled from '@emotion/styled';
import IslandFilter from '../icons/IslandFilter';
import MissionStar from '../icons/MissionStar';
import TrophyListItem from '../trophies/TrophyListItem';
import useAvailableTrophies from '../../contexts/account/useAvailableTrophies';
import TrophyList from '../trophies/TrophyList';
import { Tooltip } from '../tooltip';
import { categoriesMap } from '../trophies/categories';
import { toggleArrayElement } from '../../api/utils/arrays';
import Checkbox from '../common/Checkbox';
import IconButton from '../common/IconButton';
import { trackFilter } from '../../api/performance';
import Empty from '../icons/Empty';
import { useTargetAccount } from '../../contexts/account';
import { useMission } from '../../contexts/account/useMission';

const Header = styled.header`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  flex-grow: 1;
  margin-top: 0px;
`;

const Categories = styled.div`
  position: absolute;
  top: 133px;
  right: 44px;
  background: #3f3e43;
  width: 124px;
  z-index: 9;

  label:not(:first-child) {
    border-top: 1px solid #77777a;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

const IconContainer = styled.div`
  height: 40px;
  width: 10px;
  margin-right: 4px;
`;

const EmptyContainer = styled.div`
  background: #2b2a30;
  display: grid;
  place-items: center;
  height: 100%;
  align-content: center;
  font-family: Roboto Mono;
`;

const MapOverview = () => {
  const account = useTargetAccount();
  const availableTrophies = useAvailableTrophies(account);
  const [onlyMissions, setOnlyMissions] = useState(false);
  const [categories, setCategories] = useState<string[]>(
    Object.keys(categoriesMap)
  );
  const [showCategories, setShowCategories] = useState(false);
  const mission = useMission();
  const missionTrophyNames = mission?.trophyNames || [];

  const handleCategoryChange = (category) => () => {
    const newCategories = toggleArrayElement(categories, category);
    setCategories(newCategories);
    trackFilter(`${category} changed`);
  };

  const trophies = availableTrophies.filter(
    (trophy) =>
      categories.includes(trophy.category) &&
      (!onlyMissions || missionTrophyNames.includes(trophy.name))
  );
  return (
    <>
      <Header>
        <Title>{onlyMissions ? 'Missions' : 'Available'} Trophies</Title>
        <Tooltip title="Categories" placement="bottomRight">
          <IconButton
            active={categories.length < 7}
            onClick={() => setShowCategories(!showCategories)}
          >
            <IslandFilter />
          </IconButton>
        </Tooltip>
        {showCategories && (
          <Categories>
            <Checkbox
              checked={categories.length === 7}
              onChange={() => {
                categories.length === 7
                  ? setCategories([])
                  : setCategories(Object.keys(categoriesMap));
                trackFilter(
                  categories.length === 7
                    ? 'Select no categories'
                    : 'Select all category'
                );
              }}
              label="Select all"
            />

            {Object.values(categoriesMap).map(({ value, label, Icon }) => {
              const checked = categories.includes(value);
              return (
                <Checkbox
                  key={value}
                  type="checkbox"
                  checked={checked}
                  onChange={handleCategoryChange(value)}
                  label={
                    <>
                      <IconContainer>
                        <Icon progress={1} />
                      </IconContainer>
                      {label}
                    </>
                  }
                />
              );
            })}
            <Backdrop onClick={() => setShowCategories(false)} />
          </Categories>
        )}
        <Tooltip title="Mission trophies" placement="bottomRight">
          <IconButton
            active={onlyMissions}
            onClick={() => {
              setOnlyMissions(!onlyMissions);
              trackFilter(onlyMissions ? 'Not only missions' : 'Only missions');
            }}
            data-track-content
          >
            <MissionStar />
          </IconButton>
        </Tooltip>
      </Header>
      <TrophyList>
        {onlyMissions && trophies.length === 0 && (
          <EmptyContainer>
            <Empty />
            <h2>Nothing here yet</h2>
            <p>You completed all missions</p>
          </EmptyContainer>
        )}
        {trophies.map((trophy) => (
          <TrophyListItem
            account={account}
            trophy={trophy}
            key={trophy.name}
            borderless
          />
        ))}
      </TrophyList>
    </>
  );
};

export default MapOverview;
