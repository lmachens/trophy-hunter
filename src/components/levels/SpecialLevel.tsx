import Level from './Level';
import styled from '@emotion/styled';

const SpecialLevel = styled(Level)`
  stroke: url(#specialColor);
  fill: url(#specialColor);

  &:hover {
    stroke: url(#specialColorHover);
    fill: url(#specialColorHover);
  }
`;

export default SpecialLevel;

export const SpecialLevelGradients = () => {
  return (
    <svg>
      <defs>
        <linearGradient
          id="specialColor"
          x1="-0.166667"
          y1="-5.32785e-08"
          x2="9.05113"
          y2="8.46636"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="specialColorHover"
          x1="-0.166667"
          y1="-5.32785e-08"
          x2="9.05113"
          y2="8.46636"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F543D9" />
          <stop offset="1" stopColor="#FAD064" />
        </linearGradient>
      </defs>
    </svg>
  );
};
