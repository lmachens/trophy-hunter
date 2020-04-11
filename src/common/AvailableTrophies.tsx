import { FC } from 'react';
import styled from '@emotion/styled';
import IslandFilter from '../icons/IslandFilter';
import FavoritesFilter from '../icons/FavoritesFilter';
import TrophyListItem from '../components/trophies/TrophyListItem';
import { useAvailableTrophyNames } from '../contexts/user';
import allTrophies from '../components/trophies/allTrophies';

const List = styled.div`
  flex-grow: 1;
  overflow: auto;
  margin-bottom: 20px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  flex-grow: 1;
`;

const Filter = styled.div`
  background: #3f3e43;
  margin-left: 4px;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvailableTrophies: FC = () => {
  const availableTrophies = useAvailableTrophyNames();

  return (
    <>
      <Header>
        <Title>Available Trophies</Title>
        <Filter>
          <IslandFilter />
        </Filter>
        <Filter>
          <FavoritesFilter />
        </Filter>
      </Header>
      <List>
        {availableTrophies.map(trophyName => {
          const trophy = allTrophies[trophyName];
          return (
            <TrophyListItem trophy={trophy} key={trophy.name} borderless />
          );
        })}
      </List>
    </>
  );
};

export default AvailableTrophies;
