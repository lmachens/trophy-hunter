import { css, Global } from '@emotion/core';

export const globalStyles = (
  <Global
    styles={css`
      *,
      *:after,
      *:before {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #26252b;
        color: #eaeaea;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 16px;
        user-select: none;
      }
    `}
  />
);
