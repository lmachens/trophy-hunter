import { FC } from 'react';
import styled from '@emotion/styled';

const SVG = styled.svg`
  fill: #ff3030;

  &:hover {
    fill: #ff5252;
  }
`;

const Alert: FC = (props) => {
  return (
    <SVG
      width="24"
      height="20"
      viewBox="0 0 24 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0L24 20H0L12 0ZM11 5H13V14H11V5ZM13 17V15H11V17H13Z"
      />
    </SVG>
  );
};

export default Alert;
