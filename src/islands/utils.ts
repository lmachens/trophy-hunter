import styled from '@emotion/styled';

export function transformIsland({ name, top, left, Component }) {
  return {
    name,
    top,
    left,
    Component: styled(Component)`
      position: absolute;
      top: ${top}px;
      left: ${left}px;

      &:hover {
        background: radial-gradient(
          circle,
          rgba(246, 246, 246, 1) 0%,
          rgba(148, 187, 233, 0) 100%
        );
      }
    `
  };
}
