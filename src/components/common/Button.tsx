import { css } from '@emotion/css';
import styled from '@emotion/styled';

type Props = {
  active?: boolean;
  off?: boolean;
};

const offlineStyle = css`
  color: #77777a;
  background: #39383d;
  cursor: default;
`;

const Button = styled.button<Props>`
  padding: 7px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  border: none;
  color: #eaeaea;
  outline: none;
  font-size: 18px;
  text-transform: uppercase;
  border: ${(props) => (props.active ? '1px solid #EAEAEA' : 'none')};
  background: ${(props) => (props.active ? '#616165' : '#3f3e43')};
  text-decoration: none;

  &:hover {
    background: #616165;
  }

  ${(props) => props.off && offlineStyle};
  :disabled {
    ${offlineStyle};
  }
`;

export default Button;
