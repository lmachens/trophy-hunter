import { FC } from 'react';
import { ProgressProps } from '../types';
import ProgressSVG from '../ProgressSVG';

const SpecialProgress: FC<ProgressProps> = props => {
  return (
    <ProgressSVG viewBox="0 0 52 119" fill="none" {...props}>
      <path
        stroke="url(#special-0_linear)"
        strokeWidth="10"
        d="M6 37.9245L29.1568 6.00006L43.1912 26.717L45.9981 88.1884L20.3853 113.66L6 88.528V37.9245Z"
        fill="url(#special-0_linear)"
      />
      <path
        d="M16.875 37.9244L29.1551 6L43.1895 26.7169L29.1551 53.2073L22.4888 53.547L16.875 37.9244Z"
        fill="url(#special-1_linear)"
      />
      <path
        d="M43.1936 26.7192L29.1592 53.2097L31.2643 94.3039L46.0005 88.1907L43.1936 26.7192Z"
        fill="url(#special-2_linear)"
      />
      <path
        d="M11.6138 37.924H6V88.5275L16.8767 60.3389L11.6138 37.924Z"
        fill="url(#special-3_linear)"
      />
      <path
        d="M16.8781 37.924H11.6152L16.8781 60.3389L22.4919 53.5465L16.8781 37.924Z"
        fill="#FA619F"
      />
      <path
        d="M20.3857 104.15V113.999L45.9986 88.1882L31.2624 94.3014L20.3857 104.15Z"
        fill="#E6723D"
      />
      <defs>
        <linearGradient
          id="special-0_linear"
          x1="6.16671"
          y1="7.00006"
          x2="82.3208"
          y2="32.9047"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="special-1_linear"
          x1="24"
          y1="3"
          x2="24"
          y2="55"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF42BB" />
          <stop offset="1" stopColor="#FF8AA2" />
        </linearGradient>
        <linearGradient
          id="special-2_linear"
          x1="31.5798"
          y1="20.7192"
          x2="31.5798"
          y2="88.3039"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C42094" />
          <stop offset="1" stopColor="#FC7664" />
        </linearGradient>
        <linearGradient
          id="special-3_linear"
          x1="5.43834"
          y1="31.924"
          x2="7.5"
          y2="70"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF59CD" />
          <stop offset="1" stopColor="#EE477A" />
        </linearGradient>
      </defs>
    </ProgressSVG>
  );
};

export default SpecialProgress;
