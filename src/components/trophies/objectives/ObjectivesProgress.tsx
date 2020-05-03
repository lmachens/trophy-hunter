import { FC } from 'react';
import { ProgressProps } from '../types';
import ProgressSVG from '../ProgressSVG';

const ObjectivesProgress: FC<ProgressProps> = props => {
  return (
    <ProgressSVG viewBox="0 0 52 119" fill="none" {...props}>
      <path
        stroke="#0F8CFF"
        strokeWidth="10"
        d="M6 37.9245L29.1568 6.00006L43.1912 26.717L45.9981 88.1884L20.3853 113.66L6 88.528V37.9245Z"
        fill="#0F8CFF"
      />
      <path
        d="M16.875 37.9244L29.1551 6L43.1895 26.7169L29.1551 53.2073L22.4888 53.547L16.875 37.9244Z"
        fill="#5EB1FF"
      />
      <path
        d="M43.1936 26.7192L29.1592 53.2097L31.2643 94.3039L46.0005 88.1907L43.1936 26.7192Z"
        fill="#0E7BE0"
      />
      <path
        d="M11.6138 37.924H6V88.5275L16.8767 60.3389L11.6138 37.924Z"
        fill="#0E7BE0"
      />
      <path
        d="M16.8781 37.924H11.6152L16.8781 60.3389L22.4919 53.5465L16.8781 37.924Z"
        fill="#4A9CE9"
      />
      <path
        d="M20.3857 104.15V113.999L45.9986 88.1882L31.2624 94.3014L20.3857 104.15Z"
        fill="#1875CA"
      />
    </ProgressSVG>
  );
};

export default ObjectivesProgress;
