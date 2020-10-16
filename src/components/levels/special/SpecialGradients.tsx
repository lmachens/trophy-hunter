import styled from '@emotion/styled';

const SVG = styled.svg`
  position: absolute;
`;

const SpecialGradients = () => {
  return (
    <SVG>
      <defs>
        <linearGradient
          id="specialColor"
          x1="0"
          y1="0"
          x2="14"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="specialColorHover"
          x1="0"
          y1="0"
          x2="14"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F543D9" />
          <stop offset="1" stopColor="#FAD064" />
        </linearGradient>
      </defs>
    </SVG>
  );
};

export default SpecialGradients;
