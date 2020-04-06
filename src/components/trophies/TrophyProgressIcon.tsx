import { FC } from 'react';
import styled from '@emotion/styled';

const SVG = styled.svg`
  margin: 10px;
`;

const TrophyProgressIcon: FC = () => {
  return (
    <SVG
      width="22"
      height="35"
      viewBox="0 0 22 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <path
          d="M7 13.2272L11.6313 7.00006L14.4382 11.0411L14.9995 23.0317L9.87702 28.0002L7 23.0979V13.2272Z"
          fill="#1F1F1F"
        />
        <path
          d="M7 13.2272L11.6313 7.00006L14.4382 11.0411L14.9995 23.0317L9.87702 28.0002L7 23.0979V13.2272Z"
          stroke="#EAEAEA"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0.5"
          y="0.143555"
          width="21.0095"
          height="34.6588"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.916667 0 0 0 0 0.916667 0 0 0 0 0.916667 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </SVG>
  );
};

export default TrophyProgressIcon;
