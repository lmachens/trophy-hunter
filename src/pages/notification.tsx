import { NextPage } from 'next';
import styled from '@emotion/styled';
import { FC, useState, useEffect } from 'react';
import TrophyListItem from '../components/trophies/TrophyListItem';
import { flail } from '../components/trophies';

const Header = styled.header`
  background: #1f1f1f;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  text-transform: uppercase;
  margin: 0;
`;

const SVG = styled.svg`
  width: 28px;
  height: 28px;
  fill: #eaeaea;
  font-size: 100px;
  text-anchor: middle;
  dominant-baseline: central;
`;

const ForegroundCircle = styled.circle`
  fill: transparent;
  stroke: #eaeaea;
  transition: stroke-dashoffset 3s linear;
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

const Timer: FC = () => {
  const [timeLeft, setTimeLeft] = useState(3);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    setRunning(true);

    const timeoutId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeLeft]);

  return (
    <SVG viewBox="0 0 200 200">
      <text dx="100" dy="100">
        {timeLeft}
      </text>
      <BackgroundCircle cx="100" cy="100" r="90" />
      <ForegroundCircle
        cx="100"
        cy="100"
        r="90"
        strokeDashoffset={running ? -600 : 0}
      />
    </SVG>
  );
};

const Notification: NextPage = () => {
  return (
    <>
      <Header>
        <Title>Achievement near completion!</Title>
        <Timer />
      </Header>
      <TrophyListItem trophy={flail} />
    </>
  );
};

export default Notification;
