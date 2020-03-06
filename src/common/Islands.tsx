import styled from '@emotion/styled';
import { FC } from 'react';

const Container = styled.aside`
  flex-grow: 1;
  padding-top: 48px;
  position: relative;
`;

const Islands: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Islands;
