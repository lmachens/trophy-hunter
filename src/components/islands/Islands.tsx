import styled from '@emotion/styled';
import { FC } from 'react';
import { SpecialLevelGradients } from '../levels/SpecialLevel';

const Container = styled.div`
  flex-grow: 1;
  margin-top: 48px;
  overflow: hidden;
  position: relative;
`;

const Islands: FC = ({ children }) => {
  return (
    <Container>
      <SpecialLevelGradients />
      {children}
    </Container>
  );
};

export default Islands;
