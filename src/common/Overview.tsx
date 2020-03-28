import styled from '@emotion/styled';
import { FC } from 'react';
import Profile from './Profile';
import AvailableTrophies from './AvailableTrophies';
import Ads from './Ads';
import { TrophyData } from '../api/trophies/trophy';

const Container = styled.aside`
  padding: 48px 20px 20px 20px;
  background: #1f1f1f;
  border-left: 1px solid #77777a;
  width: 436px;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

interface OverviewProps {
  availableTrophies: TrophyData[];
}

const Overview: FC<OverviewProps> = ({ availableTrophies }) => {
  return (
    <Container>
      <Profile />
      <AvailableTrophies trophies={availableTrophies} />
      <Ads />
    </Container>
  );
};

export default Overview;
