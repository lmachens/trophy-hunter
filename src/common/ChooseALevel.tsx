import styled from '@emotion/styled';
import { FC } from 'react';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #3f3e43;
  text-align: center;
  width: 100%;
`;

const ChooseALevel: FC = () => {
  return (
    <Container>
      <img src="/select.svg" />
      <h3>Choose a level</h3>
      <p>
        to see full trophy description
        <br />
        and progress
      </p>
    </Container>
  );
};

export default ChooseALevel;
