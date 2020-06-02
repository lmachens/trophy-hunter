import { FC, useState, useEffect } from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

const SVG = styled.svg`
  width: 28px;
  height: 28px;
  fill: #eaeaea;
  font-size: 100px;
  text-anchor: middle;
`;

const circleDashOffest = keyframes`
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -600;
  }
`;

const ForegroundCircle = styled.circle`
  fill: transparent;
  stroke: #eaeaea;
  animation: ${circleDashOffest} 3s linear;
  stroke-width: 10px;
  stroke-dasharray: 600;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

const BackgroundCircle = styled.circle`
  fill: transparent;
  stroke: #707070;
  stroke-width: 10px;
`;

interface TimerProps {
  onDone(): void;
}

const Timer: FC<TimerProps> = ({ onDone }) => {
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    if (timeLeft <= 0) {
      onDone();
      setTimeLeft(3);
      return;
    }

    const timeoutId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeLeft]);

  return (
    <SVG viewBox="0 0 200 200" dominantBaseline="central">
      <text dx="100" dy="100">
        {timeLeft}
      </text>
      <BackgroundCircle cx="100" cy="100" r="90" />
      {timeLeft !== 0 && <ForegroundCircle cx="100" cy="100" r="90" />}
    </SVG>
  );
};

export default Timer;
