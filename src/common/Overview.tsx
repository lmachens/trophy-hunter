import styled from '@emotion/styled';
import { FC } from 'react';
import Profile from './Profile';
import AvailableTrophies from './AvailableTrophies';
import { VideoAds } from '../components/ads';

const Container = styled.aside`
  padding: 48px 20px 20px 20px;
  background: #1f1f1f;
  border-left: 1px solid #77777a;
  width: 436px;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const Overview: FC = () => {
  return (
    <Container>
      <Profile />
      <AvailableTrophies />
      <VideoAds />
    </Container>
  );
};

export default Overview;
