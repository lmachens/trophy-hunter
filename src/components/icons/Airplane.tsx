import { FC } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const woosh = keyframes`
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: 40;
  }
`;

const WooshLine = styled.line`
  stroke-dasharray: 10, 5, 5, 5, 10, 5;
  animation: ${woosh} 1.5s linear infinite;
`;

const Airplane: FC = () => {
  return (
    <svg
      width="64"
      height="36"
      viewBox="0 0 64 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.2769 19.906L63.4988 0L28.4988 20.5L35.2769 19.906Z"
        fill="#93295F"
      />
      <path
        d="M42.8365 33.3425L63.4996 0L35.277 19.906L42.8365 33.3425Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M63.4991 0L16.63 6.96708L28.4991 14.5L63.4991 0Z"
        fill="url(#paint1_linear)"
      />
      <path d="M28.4988 14.5L63.4992 0L28.4988 20.5V14.5Z" fill="#CC3E88" />
      <WooshLine
        x1="0"
        y1="0"
        x2="10"
        y2="0"
        transform="matrix(0.862544, -0.505982, 0.515509, 0.856884, 5.54272, 17.0273)"
        stroke="#77777A"
      />
      <WooshLine
        x1="0"
        y1="0"
        x2="10"
        y2="0"
        transform="matrix(0.862544, -0.505982, 0.515509, 0.856884, 25.7014, 35.9375)"
        stroke="#77777A"
      />
      <WooshLine
        x1="0"
        y1="0"
        x2="10"
        y2="0"
        transform="matrix(0.862544, -0.505982, 0.515509, 0.856884, 4.53479, 24.9893)"
        stroke="#77777A"
      />
      <WooshLine
        x1="0"
        y1="0"
        x2="10"
        y2="0"
        transform="matrix(0.862544, -0.505982, 0.515509, 0.856884, 13.6062, 35.9375)"
        stroke="#77777A"
      />
      <WooshLine
        x1="0"
        y1="0"
        x2="28"
        y2="0"
        transform="matrix(0.862544, -0.505982, 0.515509, 0.856884, 0, 36.1445)"
        stroke="#77777A"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="39.4996"
          y1="4"
          x2="67.6154"
          y2="28.6476"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="20.1104"
          y1="-4.42485e-07"
          x2="32.1637"
          y2="41.0634"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Airplane;
