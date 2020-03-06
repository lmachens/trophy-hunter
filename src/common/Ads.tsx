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
`;

const Ads: FC = () => {
  return <Container>400x300 ad</Container>;
};

export default Ads;
