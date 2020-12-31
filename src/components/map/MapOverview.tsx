import { useState } from 'react';
import styled from '@emotion/styled';
import IslandFilter from '../icons/IslandFilter';
import FavoritesFilter from '../icons/FavoritesFilter';
import TrophyListItem from '../trophies/TrophyListItem';
import useAvailableTrophies from '../../contexts/account/useAvailableTrophies';
import TrophyList from '../trophies/TrophyList';
import { Tooltip } from '../tooltip';
import { categoriesMap } from '../trophies/categories';
import { toggleArrayElement } from '../../api/utils/arrays';
import { useAccount } from '../../contexts/account';
import Checkbox from '../common/Checkbox';
import IconButton from '../common/IconButton';
import { GameChildProps } from '../../layouts/GameLayout';
import { trackFilter } from '../../api/performance';

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

const MapOverview = ({ onQueryChange }: GameChildProps) => {
  const { account } = useAccount();
  const availableTrophies = useAvailableTrophies();
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [categories, setCategories] = useState<string[]>(
    Object.keys(categoriesMap)
  );
  const [showCategories, setShowCategories] = useState(false);

  const handleCategoryChange = (category) => () => {
    const newCategories = toggleArrayElement(categories, category);
    setCategories(newCategories);
    trackFilter(`${category} changed`);
  };

  const trophies = availableTrophies.filter(
    (trophy) =>
      categories.includes(trophy.category) &&
      (!onlyFavorites || account.favoriteTrophyNames.includes(trophy.name))
  );
  return (
    <>
      <Header>
        <Title>Available Trophies</Title>
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
        <Tooltip title="Favorites" placement="bottomRight">
          <IconButton
            active={onlyFavorites}
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            data-track-content
          >
            <FavoritesFilter />
          </IconButton>
        </Tooltip>
      </Header>
      <TrophyList>
        {trophies.map((trophy) => (
          <TrophyListItem
            trophy={trophy}
            key={trophy.name}
            borderless
            onClick={() =>
              onQueryChange({ tool: undefined, level: trophy.level })
            }
          />
        ))}
      </TrophyList>
    </>
  );
};

export default MapOverview;
