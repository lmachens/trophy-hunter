import styled from '@emotion/styled';
import { FC } from 'react';

interface ProgressBarProps {
  progress: number;
  category: string;
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

const islandColors = {
  combat: '#ff9330',
  epic: '#c956ff',
  objectives: '#0f8cff',
  skills: '#FBFF2E',
  teamwork: '#07ef1e',
  special: 'linear-gradient(to right, #EF1ACD, #EFB31A)',
};

const Bar = styled.div<ProgressBarProps>`
  width: ${(props) => Math.min(100, Math.floor(props.progress * 100))}%;
  height: 100%;
  background: ${(props) => islandColors[props.category]};
  position: absolute;
`;

const ProgressBar: FC<ProgressBarProps> = ({ progress, max, category }) => {
  return (
    <Container>
      <Progress>
        <Bar progress={progress} category={category} />
      </Progress>
      {Math.floor(progress * max)}/{max}
    </Container>
  );
};

export default ProgressBar;
