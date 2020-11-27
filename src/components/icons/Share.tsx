import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { FC } from 'react';

interface Props {
  active: boolean;
}

const colorful = css`
  path:nth-of-type(1) {
    fill: url(#paint0_linear);
  }

  path:nth-of-type(2) {
    fill: url(#paint1_linear);
  }

  path:nth-of-type(3) {
    fill: url(#paint2_linear);
  }

  path:nth-of-type(4) {
    fill: url(#paint3_linear);
  }

  path:nth-of-type(5) {
    fill: url(#paint4_linear);
  }
`;

const SVG = styled.svg<Props>`
  fill: currentColor;

  :hover {
    ${colorful}
  }
  ${(props) => props.active && colorful}
`;

const Share: FC<Props> = (props) => (
  <SVG
    viewBox="0 0 30 30"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="6.6875"
        y1="8"
        x2="23.9709"
        y2="23.8744"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EF1ACD" />
        <stop offset="1" stopColor="#EFB31A" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="6.6875"
        y1="8"
        x2="23.9709"
        y2="23.8744"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EF1ACD" />
        <stop offset="1" stopColor="#EFB31A" />
      </linearGradient>
      <linearGradient
        id="paint2_linear"
        x1="6.6875"
        y1="8"
        x2="23.9709"
        y2="23.8744"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EF1ACD" />
        <stop offset="1" stopColor="#EFB31A" />
      </linearGradient>
      <linearGradient
        id="paint3_linear"
        x1="6.6875"
        y1="8"
        x2="23.9709"
        y2="23.8744"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EF1ACD" />
        <stop offset="1" stopColor="#EFB31A" />
      </linearGradient>
      <linearGradient
        id="paint4_linear"
        x1="6.6875"
        y1="8"
        x2="23.9709"
        y2="23.8744"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EF1ACD" />
        <stop offset="1" stopColor="#EFB31A" />
      </linearGradient>
    </defs>
    <path d="M22 10.5C22 11.8807 20.8807 13 19.5 13C18.1193 13 17 11.8807 17 10.5C17 9.11929 18.1193 8 19.5 8C20.8807 8 22 9.11929 22 10.5Z" />
    <path d="M12 15.5C12 16.8807 10.8807 18 9.5 18C8.11929 18 7 16.8807 7 15.5C7 14.1193 8.11929 13 9.5 13C10.8807 13 12 14.1193 12 15.5Z" />
    <path d="M21 20.5C21 21.8807 19.8807 23 18.5 23C17.1193 23 16 21.8807 16 20.5C16 19.1193 17.1193 18 18.5 18C19.8807 18 21 19.1193 21 20.5Z" />
    <path d="M10.6589 14.2949L17.4451 10.6173L17.9216 11.4965L11.1353 15.1741L10.6589 14.2949Z" />
    <path d="M11.4859 16.1466L17.2985 19.5025L16.7985 20.3685L10.9859 17.0126L11.4859 16.1466Z" />
  </SVG>
);

export default Share;
