import styled from '@emotion/styled';
import { FC } from 'react';

const Container = styled.div`
  flex-grow: 1;
  padding-top: 48px;
  position: relative;
  overflow: auto;
`;

const Islands: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Islands;
