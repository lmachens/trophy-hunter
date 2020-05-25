import { NextPage } from 'next';
import { InGameHeader } from '../components/headers';
import styled from '@emotion/styled';
import AvailableTrophies from '../components/trophies/AvailableTrophies';
import { VideoAds } from '../components/ads';

const ConnectionStatus = styled.div`
  margin-top: 48px;
  height: 100px;
`;

const InGame: NextPage = () => {
  return (
    <>
      <InGameHeader />
      <ConnectionStatus>Connected!</ConnectionStatus>
      <AvailableTrophies />
      <VideoAds />
    </>
  );
};

export default InGame;
