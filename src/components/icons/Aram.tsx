import React from 'react';
import styled from '@emotion/styled';

const SVG = styled.svg`
  :hover {
    path {
      fill: #77777a;
    }
  }
`;

const Aram = (props) => {
  return (
    <SVG
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.99984 4.66699H4.6665V5.00033V19.0003V19.3337H4.99984H18.9999H19.3332V19.0003V5.00033V4.66699H18.9999H4.99984ZM5.33317 18.667V5.33366H18.6665V18.667H5.33317ZM17.3332 7.00151L17.3348 6.66505L16.9984 6.66662L7.04478 6.71308L6.71455 6.71462L6.71301 7.04486L6.66657 16.9984L6.665 17.3349L7.00146 17.3333L16.9549 17.2867L17.2851 17.2852L17.2867 16.955L17.3332 7.00151ZM7.3348 16.6651L7.37813 7.3782L16.665 7.33485L16.6215 16.6216L7.3348 16.6651Z"
        fill="#77777A"
      />
      <path
        d="M13.6667 4H20V9.00001L10 20H4V14L13.6667 4Z"
        fill="#1F1F1F"
        stroke="#77777A"
        strokeWidth="0.666668"
      />
    </SVG>
  );
};

export default Aram;
