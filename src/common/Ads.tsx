import { FC } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  background: #2b2a30;
  height: 300px;
  min-height: 300px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(/trophy-hunter-bg-logo.png);
  background-repeat: no-repeat;
  background-position: center;
`;

const Ads: FC = () => {
  return <Container />;
};

export default Ads;
