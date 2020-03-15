import { FC } from 'react';
import styled from '@emotion/styled';
import Trophy from './Trophy';
import IslandFilter from '../icons/IslandFilter';
import FavoritesFilter from '../icons/FavoritesFilter';

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
`;

const AvailableTrophies: FC = () => {
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
        <Trophy />
        <Trophy />
        <Trophy />
        <Trophy />
        <Trophy />
        <Trophy />
        <Trophy />
        <Trophy />
        <Trophy />
      </List>
    </>
  );
};

export default AvailableTrophies;
