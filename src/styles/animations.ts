import { css, keyframes } from '@emotion/react';

export const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translate3d(0,0,0);
  }

  40% {
    transform: translate3d(0, -4px, 0);
  }

  60% {
    transform: translate3d(0, -2px, 0);
  }
`;

export const waveLines = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const loadingStyle = css`
  background: linear-gradient(
    to right,
    rgba(130, 130, 130, 0.2) 8%,
    rgba(130, 130, 130, 0.3) 18%,
    rgba(130, 130, 130, 0.2) 33%
  );
  background-size: 800px 100px;
  min-height: 19px;
  animation: ${waveLines} 2s infinite ease-out;
  border: none;
`;
