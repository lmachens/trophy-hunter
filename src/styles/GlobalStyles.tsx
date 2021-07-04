import { css, Global } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      *,
      *:after,
      *:before {
        box-sizing: border-box;
      }

      /* width */
      ::-webkit-scrollbar {
        width: 5px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: none;
        border-right: 1px solid #77777a;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #2b2a30;
        border: 1px solid #77777a;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #888;
      }

      :root {
        --combat-color: #ff9330;
        --skills-color: #fbff2e;
        --teamplay-color: #07ef1e;
        --objectives-color: #0f8cff;
        --epic-color: #c956ff;
      }

      html {
        font-size: 14px;
      }

      body {
        margin: 0;
        background: #2b2a30;
        color: #eaeaea;
        user-select: none;
        font-family: 'Lato', sans-serif;
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

      h5 {
        font-family: 'Roboto Mono', monospace;
        font-size: 1rem;
        font-weight: normal;
        margin: 0;
      }

      p {
        margin: 0;
      }

      button {
        color: inherit;
        font-family: 'Roboto Mono', monospace;
      }

      a,
      a:active,
      a:visited {
        text-decoration: underline;
        color: #eaeaea;
      }

      details {
        margin: 4px 0px;
      }

      strong {
        font-weight: normal;
        font-style: italic;
      }
    `}
  />
);

export default GlobalStyles;
