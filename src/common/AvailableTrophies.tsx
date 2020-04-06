import { FC } from 'react';
import styled from '@emotion/styled';
import IslandFilter from '../icons/IslandFilter';
import FavoritesFilter from '../icons/FavoritesFilter';
import TrophyListItem from '../components/trophies/TrophyListItem';
import { Trophy } from '../components/trophies/types';

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

interface AvailableTrophiesProps {
  trophies: Trophy[];
}

const AvailableTrophies: FC<AvailableTrophiesProps> = ({ trophies }) => {
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
        {trophies.map(trophy => (
          <TrophyListItem trophy={trophy} key={trophy.name} />
        ))}
      </List>
    </>
  );
};

export default AvailableTrophies;
