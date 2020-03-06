import { FC } from 'react';
import styled from '@emotion/styled';
import Trophy from './Trophy';

const List = styled.div`
  flex-grow: 1;
  overflow: auto;
  margin-bottom: 20px;
`;

const AvailableTrophies: FC = () => {
  return (
    <>
      <h3>Available Trophies</h3>
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
