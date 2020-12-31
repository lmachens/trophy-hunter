import { FC, SVGProps } from 'react';
import styled from '@emotion/styled';

const SVG = styled.svg`
  flex-shrink: 0;

  &:hover > path {
    fill: #77777a;
  }
`;

const Path = styled.path`
  fill: #1f1f1f;
`;

const Flag: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M16.5 9L7.5 4.5V12.5L16.5 9Z" />
      <path d="M7.5 22V12.5M7.5 12.5V4.5L16.5 9L7.5 12.5Z" stroke="#77777A" />
    </SVG>
  );
};

export default Flag;
