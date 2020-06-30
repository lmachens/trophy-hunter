import { FC } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  background: #2b2a30;
  height: 300px;
  min-height: 300px;
  width: 400px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${process.env.PUBLIC_DIR}/trophy-hunter-bg-logo.png);
  background-repeat: no-repeat;
  background-position: center;
`;

const VideoAds: FC = () => {
  return <Container />;
};

export default VideoAds;
