import styled from '@emotion/styled';
import { FC } from 'react';
import { ProgressProps } from './types';

const SVG = styled.svg`
  max-width: 100%;
  width: 18px;
  height: 40px;
`;

const ProgressSVG: FC<ProgressProps> = ({
  progress,
  children,
  ...svgProps
}) => {
  const fixedProgress = Math.round(progress * 100);
  const id = `gradient-${fixedProgress}`;
  return (
    <SVG {...svgProps}>
      {children}
      <path
        d="M6 37.9245L29.1568 6.00006L43.1912 26.717L45.9981 88.1884L20.3853 113.66L6 88.528V37.9245Z"
        fill={`url(#${id})`}
      />
      <defs>
        <linearGradient id={id} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop
            offset={`${fixedProgress}%`}
            stopColor="transparent"
            stopOpacity="0"
          />
          <stop
            offset={`${fixedProgress}%`}
            stopColor="#1F1F1F"
            stopOpacity="1"
          />
        </linearGradient>
      </defs>
    </SVG>
  );
};

export default ProgressSVG;
