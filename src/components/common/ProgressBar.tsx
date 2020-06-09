import styled from '@emotion/styled';
import { FC } from 'react';

interface ProgressBarProps {
  progress: number;
  max?: number;
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Progress = styled.div`
  width: 100%;
  height: 8px;
  border: 1px solid #eaeaea;
  background: #2b2a30;
  position: relative;
  margin-right: 4px;
`;

const Bar = styled.div<ProgressBarProps>`
  width: ${(props) => Math.floor(props.progress * 100)}%;
  height: 100%;
  background: #ff9330;
  position: absolute;
`;

const ProgressBar: FC<ProgressBarProps> = ({ progress, max }) => {
  return (
    <Container>
      <Progress>
        <Bar progress={progress} />
      </Progress>
      {Math.floor(progress * max)}/{max}
    </Container>
  );
};

export default ProgressBar;
