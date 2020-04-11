import styled from '@emotion/styled';
import { FC } from 'react';
import Profile from './Profile';
import AvailableTrophies from './AvailableTrophies';
import { VideoAds } from '../components/ads';
import { Trophy } from '../components/trophies/types';

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
  availableTrophies: Trophy[];
}

const Overview: FC<OverviewProps> = ({ availableTrophies }) => {
  return (
    <Container>
      <Profile />
      <AvailableTrophies trophies={availableTrophies} />
      <VideoAds />
    </Container>
  );
};

export default Overview;
