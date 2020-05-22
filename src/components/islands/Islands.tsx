import styled from '@emotion/styled';
import { FC } from 'react';
import { SpecialGradients } from '../levels/special';

const Container = styled.div`
  flex-grow: 1;
  margin-top: 48px;
  overflow: hidden;
  position: relative;
`;

const Islands: FC = ({ children, ...other }) => {
  return (
    <Container {...other}>
      <SpecialGradients />
      {children}
    </Container>
  );
};

export default Islands;
