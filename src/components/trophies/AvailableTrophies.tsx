import { FC, useState } from 'react';
import styled from '@emotion/styled';
import IslandFilter from '../icons/IslandFilter';
import FavoritesFilter from '../icons/FavoritesFilter';
import TrophyListItem from './TrophyListItem';
import useAvailableTrophies from '../../contexts/account/useAvailableTrophies';
import TrophyList from './TrophyList';
import { Trophy } from './types';
import { Tooltip } from '../tooltip';
import CombatProgress from './combat/CombatProgress';
import EpicProgress from './epic/EpicProgress';
import ObjectivesProgress from './objectives/ObjectivesProgress';
import SkillsProgress from './skills/SkillsProgress';
import SpecialProgress from './special/SpecialProgress';
import TeamworkProgress from './teamwork/TeamworkProgress';
import CheckMark from '../icons/CheckMark';

const Header = styled.header`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  flex-grow: 1;
`;

interface FilterProps {
  active: boolean;
}

const Filter = styled.div<FilterProps>`
  background: #3f3e43;
  margin-left: 4px;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;

  fill: ${(props) => (props.active ? '#EAEAEA' : '#77777A')};

  &:hover {
    background: #616165;
  }
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

const Label = styled.label`
  height: 36px;
  display: flex;
  align-items: center;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  cursor: pointer;
`;
const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

interface AvailableTrophiesProps {
  trophyProgress?: {
    trophy: Trophy;
    progress: number;
  }[];
}

const CATEGORIES = {
  combat: {
    value: 'combat',
    label: 'Combat',
    Icon: CombatProgress,
  },
  skills: {
    value: 'skills',
    label: 'Skills',
    Icon: SkillsProgress,
  },
  teamwork: {
    value: 'teamwork',
    label: 'Teamwork',
    Icon: TeamworkProgress,
  },
  objectives: {
    value: 'objectives',
    label: 'Objectives',
    Icon: ObjectivesProgress,
  },
  epic: {
    value: 'epic',
    label: 'Epic',
    Icon: EpicProgress,
  },
  special: {
    value: 'special',
    label: 'Special',
    Icon: SpecialProgress,
  },
};

const IconContainer = styled.div`
  height: 40px;
  width: 10px;
  margin-right: 4px;
`;

const CheckMarkBox = styled.div`
  height: 10px;
  width: 10px;
  border: 1px solid #77777a;
  position: relative;
  margin-right: 7px;
`;

const CheckMarkAbsolute = styled(CheckMark)`
  position: absolute;
  left: 1px;
  bottom: 1px;
`;

const AvailableTrophies: FC<AvailableTrophiesProps> = ({ trophyProgress }) => {
  const availableTrophies = useAvailableTrophies();
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [categories, setCategories] = useState<string[]>(
    Object.keys(CATEGORIES)
  );
  const [showCategories, setShowCategories] = useState(false);

  const handleCategoryChange = (category) => () => {
    const checked = categories.indexOf(category);
    if (checked === -1) {
      setCategories([...categories, category]);
    } else {
      const categoriesClone = [...categories];
      categoriesClone.splice(checked, 1);
      setCategories(categoriesClone);
    }
  };

  return (
    <>
      <Header>
        <Title>Available Trophies</Title>
        <Tooltip title="Categories" placement="bottomRight">
          <Filter
            active={categories.length < 6}
            onClick={() => setShowCategories(!showCategories)}
          >
            <IslandFilter />
          </Filter>
        </Tooltip>
        {showCategories && (
          <Categories>
            <Label>
              <Checkbox
                type="checkbox"
                checked={categories.length === 6}
                onChange={() =>
                  categories.length === 6
                    ? setCategories([])
                    : setCategories(Object.keys(CATEGORIES))
                }
              />
              <CheckMarkBox>
                {categories.length === 6 && <CheckMarkAbsolute />}
              </CheckMarkBox>
              Select all
            </Label>
            {Object.values(CATEGORIES).map(({ value, label, Icon }) => {
              const checked = categories.includes(value);
              return (
                <Label key={value}>
                  <Checkbox
                    type="checkbox"
                    checked={checked}
                    onChange={handleCategoryChange(value)}
                  />
                  <CheckMarkBox>
                    {checked && <CheckMarkAbsolute />}
                  </CheckMarkBox>
                  <IconContainer>
                    <Icon progress={1} />
                  </IconContainer>
                  {label}
                </Label>
              );
            })}
            <Backdrop onClick={() => setShowCategories(false)} />
          </Categories>
        )}
        <Tooltip title="Favorites" placement="bottomRight">
          <Filter
            active={onlyFavorites}
            onClick={() => setOnlyFavorites(!onlyFavorites)}
          >
            <FavoritesFilter />
          </Filter>
        </Tooltip>
      </Header>
      <TrophyList>
        {availableTrophies.map((trophy) => (
          <TrophyListItem
            trophy={trophy}
            key={trophy.name}
            borderless
            progress={
              trophyProgress?.find(
                (trophyProgress) => trophyProgress.trophy.name === trophy.name
              )?.progress
            }
          />
        ))}
      </TrophyList>
    </>
  );
};

export default AvailableTrophies;
