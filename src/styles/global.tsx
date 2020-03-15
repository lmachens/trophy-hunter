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
        user-select: none;
        font-family: 'Lato', sans-serif;
        font-size: 14px;
        line-height: 20px;
      }

      h2,
      h3 {
        font-family: 'Roboto Mono', monospace;
      }

      h2 {
        font-weight: normal;
        text-transform: uppercase;
        font-size: 1.28rem;
        color: #e8e8e8;
      }

      h3 {
        font-weight: normal;
        font-size: 1.14rem;
        margin: 7px 0;
      }

      h4 {
        font-family: 'Lato', sans-serif;
        margin: 0;
        font-size: 1.4rem;
        line-height: 24px;
        font-weight: normal;
        color: #e8e8e8;
      }

      p {
        margin: 0;
      }
    `}
  />
);
