import styled from '@emotion/styled';
import { FC } from 'react';

interface ProgressBarProps {
  progress: number;
  category: string;
  max?: number;
  percentage?: boolean;
  hideMessage?: boolean;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Progress = styled.div`
  width: 100%;
  height: 9px;
  background: #1f1f1f;
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
  width: ${(props) => props.progress}%;
  height: 100%;
  background: ${(props) => islandColors[props.category]};
  position: absolute;
`;

const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  max,
  category,
  percentage,
  hideMessage,
}) => {
  const fixedProgress = Math.min(100, Math.round(progress * 100));
  const message = percentage
    ? `${Math.floor(progress * 100)}%`
    : `${Math.min(max, Math.round(progress * max))}/${max}`;
  return (
    <Container>
      <Progress>
        <Bar progress={fixedProgress} category={category} />
      </Progress>
      {!hideMessage && message}
    </Container>
  );
};

export default ProgressBar;
