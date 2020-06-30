import { keyframes } from '@emotion/core';

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
